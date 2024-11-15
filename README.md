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

## Technology Stack

- React (with Hooks for state management)
- Vite (for fast development and building)
- Tailwind CSS (for styling)
- Modern JavaScript (ES6+)

## Project Structure

```
src/
  ├── components/
  │   ├── Game.jsx     # Main game component
  │   ├── Board.jsx    # Game board component
  │   └── Square.jsx   # Individual square component
  ├── hooks/
  │   └── useGame.js   # Custom hook for game logic
  ├── App.jsx
  └── index.css
```

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

## Future Improvements

- Add game history tracking
- Implement an AI opponent
- Add animations for moves and wins
- Add sound effects
- Save game state to localStorage
