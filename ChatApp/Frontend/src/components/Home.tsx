import { FC } from 'react'

interface HomeProps {
  onJoinRoom: () => void
}

const Home: FC<HomeProps> = ({ onJoinRoom }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6 bg-gradient-to-b from-gray-900 to-gray-800 overflow-y-auto">
      <div className="max-w-4xl text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
          Welcome to <span className="text-purple-400">WebChat</span>
        </h1>
        
        <p className="text-xl text-gray-300 mb-8">
          Connect with others in real-time through our secure and easy-to-use WebSocket chat application.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={onJoinRoom}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-colors text-lg shadow-lg"
          >
            Join Room
          </button>
          
          <button
            onClick={() => window.open('https://github.com/username/webchat', '_blank')}
            className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-medium transition-colors text-lg shadow-lg"
          >
            View on GitHub
          </button>
        </div>
        
        {/* Main Features */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <FeatureCard 
            icon="🔒" 
            title="Secure" 
            description="End-to-end communication with WebSockets provides a secure, private channel for your conversations"
          />
          <FeatureCard 
            icon="⚡" 
            title="Real-time" 
            description="Instant messaging with typing indicators and live updates - experience chat as it should be"
          />
          <FeatureCard 
            icon="🌐" 
            title="Private Rooms" 
            description="Create or join custom rooms with unique codes - perfect for team discussions or private conversations"
          />
        </div>
        
        {/* How It Works Section */}
        <div className="bg-gray-800 p-8 rounded-lg shadow-xl border border-purple-500 mb-16">
          <h2 className="text-3xl font-bold text-purple-400 mb-8">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StepCard 
              number={1} 
              title="Choose Your Identity" 
              description="Enter your display name - be whoever you want to be in the chat"
            />
            <StepCard 
              number={2} 
              title="Select a Room" 
              description="Create a new room or join an existing one with a unique room code"
            />
            <StepCard 
              number={3} 
              title="Connect & Chat" 
              description="The WebSocket connection establishes and you're instantly connected to everyone in the room"
            />
            <StepCard 
              number={4} 
              title="Real-time Communication" 
              description="Send messages that everyone in the room receives instantly"
            />
          </div>
        </div>
        
        {/* Use Cases */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-purple-400 mb-8">Perfect For</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <UseCaseCard 
              title="Team Collaboration" 
              description="Create private rooms for team discussions, project planning, or quick check-ins with colleagues"
              icon="👥"
            />
            <UseCaseCard 
              title="Friend Groups" 
              description="Share a room code with friends for casual conversations, planning events, or staying connected"
              icon="🎉"
            />
            <UseCaseCard 
              title="Learning Communities" 
              description="Set up study groups or Q&A sessions where participants can ask questions in real-time"
              icon="🎓"
            />
            <UseCaseCard 
              title="Event Coordination" 
              description="Create temporary chat rooms for events, conferences, or meetups to keep everyone informed"
              icon="📅"
            />
          </div>
        </div>
        
        {/* Tech Stack */}
        <div className="bg-gray-800 p-8 rounded-lg shadow-xl border border-purple-500 mb-16">
          <h2 className="text-3xl font-bold text-purple-400 mb-6">Built With Modern Tech</h2>
          
          <div className="flex flex-wrap justify-center gap-4">
            <TechBadge name="React" />
            <TechBadge name="TypeScript" />
            <TechBadge name="WebSockets" />
            <TechBadge name="Tailwind CSS" />
            <TechBadge name="Node.js" />
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Chat?</h2>
          <p className="text-lg text-gray-300 mb-8">
            Join a room now and experience real-time communication with WebChat
          </p>
          <button
            onClick={onJoinRoom}
            className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white px-10 py-4 rounded-lg font-medium transition-all text-lg shadow-lg"
          >
            Start Chatting Now
          </button>
        </div>
        
        <div className="text-center text-gray-400">
          Developed with ❤️ using React, TypeScript, and WebSockets
        </div>
      </div>
    </div>
  )
}

interface FeatureCardProps {
  icon: string
  title: string
  description: string
}

const FeatureCard: FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 transform transition-all hover:scale-105">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-purple-400 mb-3">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  )
}

interface StepCardProps {
  number: number
  title: string
  description: string
}

const StepCard: FC<StepCardProps> = ({ number, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center mb-4">
        <span className="text-white font-bold">{number}</span>
      </div>
      <h3 className="text-lg font-bold text-purple-300 mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  )
}

interface UseCaseCardProps {
  title: string
  description: string
  icon: string
}

const UseCaseCard: FC<UseCaseCardProps> = ({ title, description, icon }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 flex items-start">
      <div className="text-3xl mr-4 mt-1">{icon}</div>
      <div>
        <h3 className="text-lg font-bold text-purple-300 mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </div>
  )
}

interface TechBadgeProps {
  name: string
}

const TechBadge: FC<TechBadgeProps> = ({ name }) => {
  return (
    <div className="bg-gray-700 px-4 py-2 rounded-full text-purple-300 font-medium">
      {name}
    </div>
  )
}

export default Home