const SubmitButton: React.FC<{
  id: string;
  name: string;
}> = ({ id, name }) => {
  return (
    <button
      id={id}
      type="submit"
      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600  shadow-md border"
    >
      {name}
    </button>
  );
};

export default SubmitButton;
