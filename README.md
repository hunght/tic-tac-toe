# Video Demo: https://www.loom.com/share/48ccbfddf15d4f2bbf60824b8c56290c?sid=149ef9fc-d61d-4864-b32f-fac117361226
# React Tic-Tac-Toe

A modern implementation of the classic Tic-Tac-Toe game built with React and Tailwind CSS.

## Features

- Two-player gameplay (X and O)
- Game state tracking
- Win/Draw detection
- Responsive design
- Modern UI with hover effects
- Play again functionality
- Interactive Draggable Tree Component:
  - Drag and drop nodes to reorganize the tree structure
  - Add new nodes with the plus button
  - Edit node text by clicking the edit icon
  - Delete nodes with the trash icon
  - Expand/collapse node children
  - Undo/Redo functionality for tree modifications
  - Prevents invalid operations (like dropping a parent into its child)

## Technology Stack

- React (with Hooks for state management)
- React DnD (for drag and drop functionality)
- Vite (for fast development and building)
- Tailwind CSS (for styling)
- Modern JavaScript (ES6+)
- Heroicons (for UI icons)

## Project Structure

```
tic-tac-toe/
├── .vscode/                # VS Code configuration
├── public/                 # Static assets
├── src/                    # Source code
│   ├── components/         # React components
│   │   ├── Game.jsx       # Main game component
│   │   ├── Board.jsx      # Game board component
│   │   ├── Square.jsx     # Individual square component
│   │   ├── DraggableTree.jsx  # Tree container component
│   │   └── Tree/          # Tree-related components
│   │       ├── Tree.jsx   # Tree logic and state management
│   │       └── TreeNode.jsx # Individual tree node component
│   ├── hooks/             # Custom React hooks
│   │   └── useGame.js     # Game logic and state management
│   ├── App.jsx            # Root application component
│   └── index.css          # Global styles
├── .gitignore             # Git ignore rules
├── eslint.config.js       # ESLint configuration
├── index.html             # Entry HTML file
├── package.json           # Project dependencies and scripts
├── postcss.config.js      # PostCSS configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── vite.config.js         # Vite build configuration
```

## Development

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd tic-tac-toe
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Design Decisions

- **Component Structure**: The game is split into three main components (Game, Board, Square) for better separation of concerns and reusability.
- **Custom Hook**: Game logic is extracted into a custom hook (useGame) to separate business logic from UI components.
- **Tailwind CSS**: Used for rapid UI development and consistent styling across components.
- **State Management**: React's built-in useState hook is sufficient for this application's complexity level.

## Implementation Details

### Draggable Tree Component

The draggable tree implementation consists of three main components:

1. **DraggableTree.jsx**
   - Container component that provides the UI wrapper
   - Renders the main tree component with a title and description

2. **Tree.jsx**
   - Manages the tree state and operations
   - Features:
     - State management with history tracking
     - Undo/Redo functionality
     - Node addition and removal
     - Drag and drop coordination
     - Tree data structure manipulation

3. **TreeNode.jsx**
   - Individual node component with drag and drop capabilities
   - Features:
     - Drag and drop zones (top, middle, bottom)
     - Node editing functionality
     - Expand/collapse children
     - Add/Edit/Delete operations
     - Visual feedback during drag operations
     - Prevention of invalid drag operations

#### Tree Data Structure
```javascript
{
  id: string,      // Unique identifier
  text: string,    // Node display text
  children: []     // Array of child nodes
}
```

#### Key Features Implementation
- Uses React DnD for drag and drop functionality
- Implements a history system for undo/redo
- Prevents invalid operations like:
  - Dropping a parent into its own child
  - Dropping at the same position
  - Invalid tree structure modifications
- Provides visual feedback during drag operations
- Supports keyboard navigation for editing