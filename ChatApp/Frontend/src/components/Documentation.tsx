import { FC } from 'react'

interface DocumentationProps {
  onClose: () => void
}

const Documentation: FC<DocumentationProps> = ({ onClose }) => {
  return (
    <div className="container mx-auto p-6 overflow-y-auto h-full">
      <div className="bg-gray-800 rounded-lg p-8 shadow-lg border border-purple-500">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-purple-400 text-center flex-grow">📝 WebChat Documentation</h1>
          <button 
            onClick={onClose}
            className="bg-gray-700 hover:bg-gray-600 text-gray-300 p-2 rounded-full"
            aria-label="Close documentation"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">Overview</h2>
            <p className="text-gray-300 mb-4">
              WebChat is a real-time chat application built with React, TypeScript, and WebSockets. 
              It allows users to create and join chat rooms using unique room codes, making it easy to have 
              private conversations with friends, family, or colleagues.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FeatureCard title="WebSocket Connection">
                <ul className="list-disc pl-5 space-y-1 text-gray-300">
                  <li>Creates WebSocket connection to localhost:8080</li>
                  <li>User can join any room by entering a room code</li>
                  <li>Automatically handles connection and reconnection</li>
                </ul>
              </FeatureCard>
              
              <FeatureCard title="State Management">
                <ul className="list-disc pl-5 space-y-1 text-gray-300">
                  <li>messages - stores all chat messages</li>
                  <li>roomId - stores current room identifier</li>
                  <li>Navigation state for multi-tab interface</li>
                </ul>
              </FeatureCard>
              
              <FeatureCard title="Components">
                <ul className="list-disc pl-5 space-y-1 text-gray-300">
                  <li>Home - Landing page with features overview</li>
                  <li>RoomSelection - For joining specific rooms</li>
                  <li>ChatRoom - Main chat interface with messages</li>
                  <li>Navbar - Navigation between app sections</li>
                </ul>
              </FeatureCard>
              
              <FeatureCard title="Message Handling">
                <ul className="list-disc pl-5 space-y-1 text-gray-300">
                  <li>JSON message format with type and payload</li>
                  <li>Real-time message broadcasting</li>
                  <li>Auto-scrolling to latest messages</li>
                  <li>Enter key support for quick sending</li>
                </ul>
              </FeatureCard>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">Application Flow</h2>
            <div className="bg-gray-900 p-6 rounded-lg">
              <ol className="list-decimal pl-5 space-y-3 text-gray-300">
                <li><span className="text-purple-400 font-medium">Page Load:</span> Application loads and establishes WebSocket connection</li>
                <li><span className="text-purple-400 font-medium">Room Selection:</span> User enters room code to join specific room</li>
                <li><span className="text-purple-400 font-medium">Message Sending:</span> User types message and clicks send</li>
                <li><span className="text-purple-400 font-medium">Server Processing:</span> Server receives message and processes it</li>
                <li><span className="text-purple-400 font-medium">Message Broadcasting:</span> Server broadcasts to all members in the room</li>
                <li><span className="text-purple-400 font-medium">Message Display:</span> All clients see the new message immediately</li>
              </ol>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">Technical Details</h2>
            <div className="bg-gray-900 p-6 rounded-lg mb-4">
              <h3 className="text-xl font-medium text-purple-400 mb-3">Message Format</h3>
              <pre className="bg-gray-800 p-4 rounded-lg overflow-x-auto">
                {`{
  "type": "chat" | "join",
  "payload": {
    "message"?: string,  // For chat messages
    "roomId"?: string    // For room joining
  }
}`}
              </pre>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-lg">
              <h3 className="text-xl font-medium text-purple-400 mb-3">WebSocket Events</h3>
              <table className="w-full text-gray-300">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-2">Event</th>
                    <th className="text-left py-2">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-800">
                    <td className="py-2 pr-4 font-medium">onopen</td>
                    <td className="py-2">Connection established, join room</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-2 pr-4 font-medium">onmessage</td>
                    <td className="py-2">Receive and display new messages</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium">onclose</td>
                    <td className="py-2">Clean up when leaving room</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
        
        <div className="mt-8 text-center text-gray-400">
          <button 
            onClick={onClose}
            className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-lg shadow-md transition-colors"
          >
            Return to Application
          </button>
          <div className="mt-4">
            Developed with ❤️ using React, TypeScript, and WebSockets
          </div>
        </div>
      </div>
    </div>
  )
}

interface FeatureCardProps {
  title: string
  children: React.ReactNode
}

const FeatureCard: FC<FeatureCardProps> = ({ title, children }) => {
  return (
    <div className="bg-gray-900 rounded-lg p-4">
      <h3 className="text-lg font-bold text-purple-300 mb-2">{title}</h3>
      {children}
    </div>
  )
}

export default Documentation