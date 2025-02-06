const Select: React.FC<{
  id: string;
  name: string;
  placeholder?: string;
  value?: string;
  options: { label: string; value: string }[];
  register: any;
}> = ({ id, name, placeholder, value, options, register }) => {
        // 	It takes (id, placeholder, name, options like [{'Title 1':'value_of_this_option'},
  //    {'Title 2':'value_of_this_option'}], selected value)
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium ">
        {placeholder || name}
      </label>
      <select
        id={id}
        defaultValue={value || ""} // Use value as defaultValue
        {...register(name)} // Register the select field
        className="mt-1 block w-full  border-gray-300 rounded-md py-2 px-2 shadow-md border"
      >
        <option value="">{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
