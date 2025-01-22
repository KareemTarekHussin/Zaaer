import React, { useState } from "react";

const AddNewButton: React.FC<{ options?: { label: string; onClick: () => void }[] }> = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Add New
      </button>
      {options && isOpen && (
        <div className="absolute bg-white shadow-md mt-2 rounded w-48">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={option.onClick}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddNewButton;
