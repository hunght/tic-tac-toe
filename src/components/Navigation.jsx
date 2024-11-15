import React from 'react';

const Navigation = ({ selectedProject, onSelectProject }) => {
  const projects = [
    { id: 'tictactoe', name: 'Tic Tac Toe' },
    { id: 'draggabletree', name: 'Draggable Tree' }
  ];

  return (
    <nav className="bg-white shadow-lg p-4 mb-6">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">Projects</h1>
        <div className="flex gap-4">
          {projects.map((project) => (
            <button
              key={project.id}
              onClick={() => onSelectProject(project.id)}
              className={`px-4 py-2 rounded-md transition-colors ${
                selectedProject === project.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
              }`}
            >
              {project.name}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
