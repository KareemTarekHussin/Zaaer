const TextArea: React.FC<{
  id: string;
  placeholder?: string;
  name: string;
  value?: string; // Backend requirement
  register: any;
}> = ({ id, placeholder, name, value, register }) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium">
        {placeholder || name}
      </label>
      <textarea
        id={id}
        placeholder={placeholder}
        defaultValue={value || ""} // Use value as defaultValue
        {...register(name)} // Register the textarea
        className="mt-1 block w-full border-gray-300 rounded-md"
      />
    </div>
  );
};

export default TextArea;
