// components/ChatRoom.tsx
import { FC, useEffect, useRef, useState } from 'react'

interface Message {
  text: string;
  isSystem: boolean;
  isSelf: boolean;
  timestamp: string;
  userName?: string;
}

interface ChatRoomProps {
  roomId: string
  userName: string
  onLeaveRoom: () => void
}

const ChatRoom: FC<ChatRoomProps> = ({ roomId, userName, onLeaveRoom }) => {
  // State to store chat messages with metadata
  const [messages, setMessages] = useState<Message[]>([{
    text: `Welcome to room: ${roomId}`,
    isSystem: true,
    isSelf: false,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }])
  
  // State to track connection status
  const [isConnecting, setIsConnecting] = useState<boolean>(true)
  
  // Refs to store WebSocket connection and input elements
  const wsRef = useRef<WebSocket | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)
  
  // Keep track of current room ID to detect changes
  const currentRoomRef = useRef<string>(roomId)
  
  // User is typing indicator
  const [isTyping, setIsTyping] = useState<boolean>(false)
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Effect for WebSocket connection management
  useEffect(() => {
    // Reset messages when room changes
    if (currentRoomRef.current !== roomId) {
      setMessages([{
        text: `Welcome to room: ${roomId}`,
        isSystem: true,
        isSelf: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }])
      currentRoomRef.current = roomId
    }
    
    // Use this flag to prevent creating a new connection while one is closing
    let isCleanedUp = false;
    
    // Function to create a new WebSocket connection
    const createConnection = () => {
      // Set connecting state
      setIsConnecting(true);
      
      // Make sure any previous connection is fully closed
      if (wsRef.current) {
        try {
          wsRef.current.close();
        } catch (e) {
          console.error("Error closing previous connection:", e);
        }
        wsRef.current = null;
      }
      
      // Don't create a new connection if component is unmounting
      if (isCleanedUp) return;
      
      // Create new WebSocket connection with error handling
      try {
        const ws = new WebSocket("https://webchat-2-lokd.onrender.com");
        
        // Store WebSocket connection in ref for later use
        wsRef.current = ws;
        
        // Handle connection events
        ws.onopen = () => {
          setIsConnecting(false);
          
          // Send join room message when connection is established
          ws.send(JSON.stringify({
            type: "join",
            payload: {
              roomId: roomId,
              userName: userName
            }
          }));
          
          // Add system message that connection was successful
          setMessages(prev => [...prev, {
            text: "Connected to chat server",
            isSystem: true,
            isSelf: false,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }]);
        };
        
        // Handle incoming messages from server
        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            
            // Check if the message is from the server or another user
            if (data.type === "chat") {
              setMessages(m => [...m, {
                text: data.payload.message,
                isSystem: false,
                isSelf: data.payload.isSelf || false,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                userName: data.payload.userName || "Anonymous"
              }]);
            } else if (data.type === "system") {
              setMessages(m => [...m, {
                text: data.payload.message,
                isSystem: true,
                isSelf: false,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              }]);
            } else {
              // Fallback for simple string messages (for backward compatibility)
              setMessages(m => [...m, {
                text: event.data,
                isSystem: false,
                isSelf: false,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              }]);
            }
          } catch (e) {
            // Handle plain text messages (for backward compatibility)
            setMessages(m => [...m, {
              text: event.data,
              isSystem: false,
              isSelf: false,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);
          }
        };
        
        // Handle connection close
        ws.onclose = () => {
          if (!isCleanedUp) {
            setMessages(prev => [...prev, {
              text: "Disconnected from server. Reconnecting...",
              isSystem: true,
              isSelf: false,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);
            // Attempt to reconnect after a short delay
            setTimeout(() => {
              if (!isCleanedUp) {
                createConnection();
              }
            }, 2000);
          }
        };
        
        // Handle connection errors
        ws.onerror = (error) => {
          console.error("WebSocket error:", error);
          setMessages(prev => [...prev, {
            text: "Connection error. Reconnecting...",
            isSystem: true,
            isSelf: false,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }]);
          // Let the onclose handler handle reconnection
        };
        
      } catch (error) {
        console.error("Failed to create WebSocket:", error);
        setIsConnecting(false);
        
        // Attempt to reconnect after a short delay
        if (!isCleanedUp) {
          setTimeout(() => {
            if (!isCleanedUp) {
              createConnection();
            }
          }, 2000);
        }
      }
    };
    
    // Start the connection process
    createConnection();
    
    // Cleanup function to close WebSocket when component unmounts
    return () => {
      isCleanedUp = true;
      
      if (wsRef.current) {
        try {
          wsRef.current.close();
        } catch (e) {
          console.error("Error closing connection on cleanup:", e);
        }
        wsRef.current = null;
      }
    };
  }, [roomId, userName]); // Dependency on roomId and userName

  // Function to handle sending a message
  const handleSendMessage = () => {
    const messageText = inputRef.current?.value.trim()
    if (messageText && wsRef.current?.readyState === WebSocket.OPEN) {
      // Add the message to our own chat immediately with isSelf flag
      setMessages(prev => [...prev, {
        text: messageText,
        isSystem: false,
        isSelf: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        userName: userName
      }]);
      
      // Send the message to the server
      wsRef.current.send(JSON.stringify({
        type: "chat",
        payload: {
          message: messageText,
          roomId: roomId,
          userName: userName
        }
      }))
      
      // Clear input after sending
      if (inputRef.current) {
        inputRef.current.value = ""
      }
      
      // Clear typing indicator
      setIsTyping(false);
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    } else if (wsRef.current?.readyState !== WebSocket.OPEN) {
      // Add message that connection is not ready
      setMessages(prev => [...prev, {
        text: "Cannot send message. Connection not ready.",
        isSystem: true,
        isSelf: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }
  }

  // Handle user typing
  const handleTyping = () => {
    setIsTyping(true);
    
    // Clear previous timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    // Set a new timeout
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 2000);
  }

  // Handle leave room
  const handleLeaveRoom = () => {
    if (wsRef.current) {
      // Send leave room message to server
      try {
        if (wsRef.current.readyState === WebSocket.OPEN) {
          wsRef.current.send(JSON.stringify({
            type: "leave",
            payload: {
              roomId: roomId,
              userName: userName
            }
          }));
        }
        wsRef.current.close();
      } catch (e) {
        console.error("Error closing connection on leave:", e);
      }
      wsRef.current = null;
    }
    // Clear messages when leaving room
    setMessages([]);
    onLeaveRoom();
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Room header */}
      <div className="bg-gray-800 p-4 border-b border-purple-500 flex justify-between items-center shadow-lg">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-purple-600 flex items-center justify-center mr-3">
            <span className="text-white font-bold">{roomId.substring(0, 2).toUpperCase()}</span>
          </div>
          <div>
            <h2 className="font-bold text-lg">
              Room: <span className="text-purple-400">{roomId}</span>
            </h2>
            <div className="text-xs text-gray-400">You are {userName}</div>
          </div>
        </div>
        <div className="flex items-center">
          {isConnecting && (
            <span className="mr-4 text-yellow-400 text-sm flex items-center">
              <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse mr-2"></div>
              Connecting...
            </span>
          )}
          <button
            onClick={handleLeaveRoom}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm font-medium transition-colors shadow-md"
          >
            Leave Room
          </button>
        </div>
      </div>
      
      {/* Chat messages container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.isSelf ? 'justify-end' : 'justify-start'} mb-4`}>
            {!message.isSelf && !message.isSystem && (
              <div className="h-8 w-8 rounded-full bg-purple-500 flex items-center justify-center mr-2 mt-1">
                <span className="text-xs font-bold">{message.userName?.substring(0, 2).toUpperCase() || "??"}</span>
              </div>
            )}
            
            <div className={`rounded-lg p-3 max-w-md break-words shadow-lg ${
              message.isSystem
                ? "bg-gray-700 text-gray-300" 
                : message.isSelf
                  ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                  : "bg-gradient-to-r from-purple-500 to-indigo-600 text-white"
            }`}>
              {!message.isSystem && !message.isSelf && (
                <div className="text-xs text-gray-200 mb-1">{message.userName}</div>
              )}
              <div>{message.text}</div>
              <div className="text-xs mt-1 text-gray-200 text-right opacity-80">{message.timestamp}</div>
            </div>
            
            {message.isSelf && (
              <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center ml-2 mt-1">
                <span className="text-xs font-bold">{userName.substring(0, 2).toUpperCase()}</span>
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="flex items-center text-gray-400 text-sm">
            <div className="flex space-x-1 mr-2">
              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-100"></div>
              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-200"></div>
            </div>
            Someone is typing...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Message input and send button */}
      <div className="border-t border-purple-700 p-4 bg-gray-800 shadow-lg">
        <div className="flex rounded-lg overflow-hidden border border-purple-500 shadow-lg">
          <input 
            ref={inputRef}
            className="flex-1 p-4 bg-gray-700 text-white focus:outline-none focus:bg-gray-600 transition-colors"
            placeholder="Type your message..."
            disabled={isConnecting}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage()
              }
            }}
            onChange={handleTyping}
          />
          <button 
            onClick={handleSendMessage} 
            className={`px-6 py-4 font-medium transition-colors ${
              isConnecting 
                ? "bg-gray-600 text-gray-400 cursor-not-allowed" 
                : "bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white"
            }`}
            disabled={isConnecting}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatRoom
