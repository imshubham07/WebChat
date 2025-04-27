import { FC, useRef, useState } from 'react'

interface RoomSelectionProps {
  onJoinRoom: (roomCode: string, userName: string) => void
}

const RoomSelection: FC<RoomSelectionProps> = ({ onJoinRoom }) => {
  const roomInputRef = useRef<HTMLInputElement>(null)
  const usernameInputRef = useRef<HTMLInputElement>(null)
  const [roomCode, setRoomCode] = useState<string>("")
  const [userName, setUserName] = useState<string>("")
  const [error, setError] = useState<string>("")
  
  const handleJoin = () => {
    const code = roomInputRef.current?.value.trim()
    const name = usernameInputRef.current?.value.trim()
    
    if (!name) {
      setError("Please enter your username")
      return
    }
    
    if (!code) {
      setError("Please enter a room code")
      return
    }
    
    onJoinRoom(code, name)
  }
  
  const generateRandomRoom = () => {
    // Generate a random 6-character alphanumeric code
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    
    setRoomCode(result)
    if (roomInputRef.current) {
      roomInputRef.current.value = result
    }
    setError("")
  }
  
  return (
    <div className="flex flex-col items-center justify-center h-full p-4 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="bg-gray-800 rounded-lg p-8 shadow-xl border border-purple-500 w-full max-w-md transform transition-all hover:scale-105">
        <h2 className="text-3xl font-bold text-purple-400 mb-6 text-center">Join a Chat Room</h2>
        
        {/* Username Input */}
        <div className="relative mb-6">
          <label htmlFor="userName" className="block text-sm font-medium text-gray-300 mb-2">
            Your Name
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-400">
              👤
            </span>
            <input
              ref={usernameInputRef}
              id="userName"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value)
                setError("")
              }}
              className="w-full pl-8 p-4 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all"
              placeholder="Enter your name"
            />
          </div>
        </div>
        
        {/* Room Code Input */}
        <div className="relative mb-6">
          <label htmlFor="roomCode" className="block text-sm font-medium text-gray-300 mb-2">
            Room Code
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-400">
              #
            </span>
            <input
              ref={roomInputRef}
              id="roomCode"
              value={roomCode}
              onChange={(e) => {
                setRoomCode(e.target.value)
                setError("")
              }}
              className="w-full pl-8 p-4 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all"
              placeholder="Enter room code"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleJoin()
                }
              }}
            />
          </div>
          {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
        </div>
        
        <div className="space-y-4">
          <button
            onClick={handleJoin}
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white py-3 px-4 rounded-lg font-medium transition-all shadow-lg"
          >
            Join Room
          </button>
          
          <div className="flex items-center justify-center space-x-4">
            <div className="h-px bg-gray-700 flex-1"></div>
            <span className="text-gray-400 text-sm">or</span>
            <div className="h-px bg-gray-700 flex-1"></div>
          </div>
          
          <button
            onClick={generateRandomRoom}
            className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
          >
            <span>Generate Random Room</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
        
        <div className="mt-6 text-center text-gray-400 text-sm">
          <p>Create a new room by entering a unique code</p>
          <p className="mt-1">or join an existing one if you know the code</p>
        </div>
      </div>
    </div>
  )
}

export default RoomSelection