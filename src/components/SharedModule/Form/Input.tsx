import React from "react";

const Input: React.FC<{
  id: string;
  type: string;
  placeholder?: string;
  name: string;
  value?: string; 
  register: any;
}> = ({ id, type, placeholder, name, value, register }) => {
  // 	It takes (id, placeholder, name, value)
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium ">
        {placeholder || name}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        defaultValue={value || ""} // Use value as defaultValue
        {...register(name)} // Register the input
        className="mt-1 block w-full border-gray-300 rounded-md py-2 px-2 shadow-md border"
      />
    </div>
  );
};

export default Input;
