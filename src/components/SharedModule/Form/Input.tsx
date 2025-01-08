export const Input = ({ id, name, type = 'text', placeholder, value, ...rest }:any) => (
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      defaultValue={value}
      {...rest}
      className="border rounded px-4 py-2 w-full"
    />
  );