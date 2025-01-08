export const Select = ({ id, name, options, value, placeholder, ...rest }:any) => (
    <select
      id={id}
      name={name}
      defaultValue={value}
      className="border rounded px-4 py-2 w-full"
      {...rest}
    >
      <option value="">{placeholder}</option>
      {options.map((opt:any, index:any) => (
        <option key={index} value={Object.values(opt)[0] as string | number}>
          {Object.keys(opt)[0]}
        </option>
      ))}
    </select>
  );