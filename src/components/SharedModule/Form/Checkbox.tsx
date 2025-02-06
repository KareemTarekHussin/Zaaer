const Checkbox: React.FC<{
  id: string;
  name: string;
  placeholder?: string;
  value?: boolean; // Backend requirement
  register: any;
}> = ({ id, name, placeholder, value, register }) => {
  // 	It takes (id, placeholder, name, value, is checked)
  return (
    <div className="mb-4 flex items-center ">
      <input
        id={id}
        type="checkbox"
        defaultChecked={value || false} // Use value as defaultChecked
        {...register(name)} // Register the checkbox
        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
      />
      <label htmlFor={id} className="ml-2 text-sm font-medium">
        {placeholder || name}
      </label>
    </div>
  );
};

export default Checkbox;
