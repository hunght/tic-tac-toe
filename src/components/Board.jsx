import Square from './Square';

const Board = ({ squares, onSquareClick }) => {
  return (
    <div className="grid grid-cols-3 gap-1 bg-gray-400 p-1 rounded">
      {squares.map((value, index) => (
        <Square
          key={index}
          value={value}
          onClick={() => onSquareClick(index)}
        />
      ))}
    </div>
  );
};

export default Board;
