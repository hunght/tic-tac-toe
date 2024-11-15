import Board from './Board';
import useGame from '../hooks/useGame';

const Game = () => {
  const { board, xIsNext, gameStatus, handleMove, resetGame } = useGame();

  const getStatusMessage = () => {
    if (gameStatus === 'won') {
      return `Winner: ${!xIsNext ? 'O' : 'X'}`;
    }
    if (gameStatus === 'draw') {
      return 'Game ended in a draw!';
    }
    return `Next player: ${xIsNext ? 'X' : 'O'}`;
  };

  return (
    <div className="flex flex-col items-center gap-8 p-8">
      <h1 className="text-4xl font-bold text-gray-800">Tic Tac Toe</h1>
      
      <div className="flex flex-col items-center gap-4">
        <Board squares={board} onSquareClick={handleMove} />
        
        <div className="text-xl font-semibold text-gray-700">
          {getStatusMessage()}
        </div>
        
        {gameStatus !== 'playing' && (
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            onClick={resetGame}
          >
            Play Again
          </button>
        )}
      </div>
    </div>
  );
};

export default Game;
