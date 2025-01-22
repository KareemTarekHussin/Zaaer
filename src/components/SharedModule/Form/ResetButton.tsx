const ResetButton: React.FC<{
  id: string;
  name: string;
  onClick: () => void;
}> = ({ id, name, onClick }) => {
  return (
    <button
      id={id}
      type="button"
      onClick={() => {
        console.log("ResetButton onClick triggered");
        onClick();
      }}
      className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
    >
      {name}
    </button>
  );
};

export default ResetButton;
