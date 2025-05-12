import { useState } from 'react'
import ChatRoom from './components/ChatRoom'
import RoomSelection from './components/RoomSelection'
import Navbar from './components/Navbar'
import Documentation from './components/Documentation'
import Home from './components/Home'

// Footer component for consistent app-wide footer
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-400 py-4 px-6 shadow-inner border-t border-gray-700">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <p className="text-center md:text-left">
            <span className="text-purple-400 font-bold">WebChat</span> © {new Date().getFullYear()} - Real-time communication made simple
          </p>
        </div>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-purple-400 transition-colors">Help</a>
          <a href="#" className="hover:text-purple-400 transition-colors">Privacy</a>
          <a href="#" className="hover:text-purple-400 transition-colors">Terms</a>
          <a href="https://github.com/username/webchat" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors">GitHub</a>
        </div>
      </div>
    </footer>
  )
}

// Quick Help component for simplified documentation access
interface QuickHelpProps {
  setActiveTab: (tab: 'home' | 'chat' | 'docs') => void;
}

const QuickHelp = ({ setActiveTab }: QuickHelpProps) => {
  return (
    <div className="fixed bottom-20 right-6 z-10">
      <button 
        onClick={() => setActiveTab('docs')}
        className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
        title="Quick Help"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
    </div>
  )
}

function App() {
  // State for room and navigation
  const [isJoined, setIsJoined] = useState(false)
  const [roomId, setRoomId] = useState("")
  const [userName, setUserName] = useState("")
  const [activeTab, setActiveTab] = useState<'home' | 'chat' | 'docs'>('home')
  
  // Function to handle joining a room
  const handleJoinRoom = (roomCode: string, name: string) => {
    setRoomId(roomCode)
    setUserName(name)
    setIsJoined(true)
    setActiveTab('chat')
  }

  // Function to handle leaving a room
  const handleLeaveRoom = () => {
    setIsJoined(false)
    setRoomId("")
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white font-sans">
      {/* Navbar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isJoined={isJoined} 
        roomId={roomId} 
      />
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {activeTab === 'home' && (
          <Home onJoinRoom={() => setActiveTab('chat')} />
        )}
        
        {activeTab === 'chat' && (
          !isJoined ? (
            <RoomSelection onJoinRoom={handleJoinRoom} />
          ) : (
            <ChatRoom 
              roomId={roomId} 
              userName={userName}
              onLeaveRoom={handleLeaveRoom} 
            />
          )
        )}
        
        {activeTab === 'docs' && (
          <Documentation onClose={() => setActiveTab(isJoined ? 'chat' : 'home')} />
        )}
      </div>

      {/* Quick Help Button - Fixed position button for quick access to docs */}
      {activeTab !== 'docs' && <QuickHelp setActiveTab={setActiveTab} />}
      
      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App