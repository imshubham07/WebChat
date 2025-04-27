import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

interface User {
  socket: WebSocket;
  room: string;
  userName: string;
}

// Store all connected users
let allUsers: User[] = [];

wss.on("connection", (socket) => {
  // Set default values initially
  let currentUser: User = { socket, room: "", userName: "Anonymous" };

  socket.on("message", (message) => {
    try {
      const parsedMessage = JSON.parse(message as unknown as string);
      
      // Handle join room requests
      if (parsedMessage.type === "join") {
        const roomId = parsedMessage.payload.roomId;
        const userName = parsedMessage.payload.userName || "Anonymous";
        
        // Check if user was already in a room
        const existingUserIndex = allUsers.findIndex(user => user.socket === socket);
        
        if (existingUserIndex !== -1) {
          // Update existing user's room
          allUsers[existingUserIndex].room = roomId;
          allUsers[existingUserIndex].userName = userName;
          currentUser = allUsers[existingUserIndex];
        } else {
          // Add new user
          currentUser = { socket, room: roomId, userName };
          allUsers.push(currentUser);
        }
        
        // Get count of users in this room
        const usersInRoom = allUsers.filter(user => user.room === roomId).length;
        
        // Notify room about new user
        broadcastToRoom(roomId, {
          type: "system",
          payload: {
            message: `${userName} has joined the room (${usersInRoom} ${usersInRoom === 1 ? 'person' : 'people'} in room)`
          }
        });
        
        console.log(`User ${userName} joined room: ${roomId}. Total users: ${allUsers.length}`);
      }
      
      // Handle chat messages
      else if (parsedMessage.type === "chat") {
        const roomId = currentUser.room;
        const userName = currentUser.userName;
        
        if (!roomId) {
          // If no room is set, send error back to sender
          socket.send(JSON.stringify({
            type: "system",
            payload: {
              message: "You're not connected to any room"
            }
          }));
          return;
        }
        
        // Broadcast message to all users in the room except sender
        broadcastToRoom(roomId, {
          type: "chat",
          payload: {
            message: parsedMessage.payload.message,
            userName: userName,
            isSelf: false
          }
        }, socket); // Exclude sender
      }
      
      // Handle leave room requests
      else if (parsedMessage.type === "leave") {
        const roomId = parsedMessage.payload.roomId;
        const userName = currentUser.userName;
        
        // Notify room that user has left
        broadcastToRoom(roomId, {
          type: "system",
          payload: {
            message: `${userName} has left the room`
          }
        });
        
        // Remove user from allUsers if they're leaving
        allUsers = allUsers.filter(user => user.socket !== socket);
        currentUser = { socket, room: "", userName };
        
        console.log(`User ${userName} left room: ${roomId}. Remaining users: ${allUsers.length}`);
      }
    } catch (error) {
      console.error("Failed to parse message:", error);
      socket.send(JSON.stringify({
        type: "system",
        payload: {
          message: "Invalid message format"
        }
      }));
    }
  });

  // Handle user disconnection
  socket.on("close", () => {
    // Find the disconnected user's room and name
    const user = allUsers.find(u => u.socket === socket);
    
    if (user && user.room) {
      // Notify room that user has disconnected
      broadcastToRoom(user.room, {
        type: "system",
        payload: {
          message: `${user.userName} has disconnected`
        }
      });
    }
    
    // Remove the disconnected socket from the array
    allUsers = allUsers.filter(u => u.socket !== socket);
    console.log("User disconnected. Remaining users:", allUsers.length);
  });
});

// Helper function to broadcast messages to all users in a room
function broadcastToRoom(roomId: string, message: any, excludeSocket?: WebSocket) {
  const jsonMessage = JSON.stringify(message);
  
  allUsers.forEach(user => {
    if (user.room === roomId && (!excludeSocket || user.socket !== excludeSocket)) {
      if (user.socket.readyState === WebSocket.OPEN) {
        user.socket.send(jsonMessage);
      }
    }
  });
}