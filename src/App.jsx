import { useState } from 'react'
import './App.css'
import Game from './components/Game'
import DraggableTree from './components/DraggableTree'
import Navigation from './components/Navigation'

function App() {
  const [selectedProject, setSelectedProject] = useState('tictactoe')

  const renderProject = () => {
    switch (selectedProject) {
      case 'tictactoe':
        return <Game />
      case 'draggabletree':
        return <DraggableTree />
      default:
        return <Game />
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation 
        selectedProject={selectedProject} 
        onSelectProject={setSelectedProject} 
      />
      {renderProject()}
    </div>
  )
}

export default App
