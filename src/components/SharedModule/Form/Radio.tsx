const Radio: React.FC<{
  id: string;
  name: string;
  options: { title: string; value: string }[];
  register: any;
}> = ({ id, name, options, register }) => {
  // 	It takes (id, title, name, list with values like [{'Title 1':'value_of_this_option'}, 
  //   {'Title 2':'value_of_this_option'}]
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium">{name}</label>
      {options.map((option, index) => (
        <div key={index} className="flex items-center">
          <input
            id={`${id}-${index}`}
            type="radio"
            value={option.value}
            {...register(name)} // Register the radio field
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 "
          />
          <label htmlFor={`${id}-${index}`} className="ml-2 text-sm font-medium">
            {option.title}
          </label>
        </div>
      ))}
    </div>
  );
};

export default Radio;
