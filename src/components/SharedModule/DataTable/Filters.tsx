import { useState } from "react";

const Filter: React.FC<{
  fields: any[];
  onSearch: (filters: Record<string, string>) => void;
  onReset: () => void;
}> = ({ fields, onSearch, onReset }) => {
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});

  const handleChange = (name: string, value: string) => {
    setFilterValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="mb-6">
      <div className="grid grid-cols-2 gap-4">
        {fields.map((field, index) => (
          <div key={index} className="mb-4">
            <label htmlFor={field.id} className="block text-sm font-medium">
              {field.title}
            </label>
            {field.type === "text" && (
              <input
                id={field.id}
                type="text"
                placeholder={field.placeholder}
                value={filterValues[field.name] || ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md"
              />
            )}
            {field.type === "select" && (
              <select
                id={field.id}
                value={filterValues[field.name] || ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md"
              >
                <option value="">Select {field.title}</option>
                {field.options.map((option: any, idx: number) => (
                  <option key={idx} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 flex gap-4">
        <button
          onClick={() => onSearch(filterValues)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
        <button
          onClick={onReset}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Filter;
