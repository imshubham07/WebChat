import { FC } from 'react'

interface NavbarProps {
  activeTab: 'home' | 'chat' | 'docs'
  setActiveTab: (tab: 'home' | 'chat' | 'docs') => void
  isJoined: boolean
  roomId: string
}

const Navbar: FC<NavbarProps> = ({ activeTab, setActiveTab, isJoined, roomId }) => {
  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-xl font-bold text-purple-400">WebChat</span>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <NavButton 
              label="Home" 
              active={activeTab === 'home'} 
              onClick={() => setActiveTab('home')} 
            />
            
            <NavButton 
              label={isJoined ? `Chat (${roomId})` : "Chat"} 
              active={activeTab === 'chat'} 
              onClick={() => setActiveTab('chat')} 
            />
            
            <NavButton 
              label="Documentation" 
              active={activeTab === 'docs'} 
              onClick={() => setActiveTab('docs')} 
            />
          </div>
        </div>
      </div>
    </nav>
  )
}

interface NavButtonProps {
  label: string
  active: boolean
  onClick: () => void
}

const NavButton: FC<NavButtonProps> = ({ label, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        active 
          ? 'bg-purple-600 text-white' 
          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
      }`}
    >
      {label}
    </button>
  )
}

export default Navbar
