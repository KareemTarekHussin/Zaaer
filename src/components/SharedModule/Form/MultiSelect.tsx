const MultiSelect: React.FC<{
  id: string;
  name: string;
  placeholder?: string;
  value?: string[]; // Backend requirement
  options: { label: string; value: string }[];
  register: any;
}> = ({ id, name, placeholder, value = [], options, register }) => {
    // 	It takes (id, placeholder, name, options like [{'Title 1':'value_of_this_option'}, 
  //   {'Title 2':'value_of_this_option'}], list of selected values)
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium">
        {placeholder || name}
      </label>
      <select
        id={id}
        multiple
        defaultValue={value} // Use value as defaultValue
        {...register(name)} // Register the multi-select
        className="mt-1 block w-full border-gray-300 rounded-md"
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MultiSelect;
