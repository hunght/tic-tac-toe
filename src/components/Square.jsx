const Square = ({ value, onClick }) => {
  return (
    <button
      className={`w-20 h-20 border border-gray-400 text-4xl font-bold bg-white hover:bg-gray-100 transition-colors ${
        value === 'X' ? 'text-blue-600' : value === 'O' ? 'text-red-600' : ''
      }`}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default Square;
