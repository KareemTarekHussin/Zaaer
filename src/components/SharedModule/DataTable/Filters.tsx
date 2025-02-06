import { useState } from "react";

interface FilterField {
  value: string;
  type: string;              // "text" | "select" | "date" | "radio" | "checkbox" etc.
  name: string;
  id: string;
  title: string;
  placeholder?: string;
  options?: { label: string; value: string }[]; 
  // for radio, you might pass an array of objects like [ { label: "Active", value: "active" }, ...]
  // for checkbox, you can store value if needed
}

const Filter: React.FC<{
  fields: FilterField[];
  onSearch: (filters: Record<string, string>) => void;
  onReset: () => void;
}> = ({ fields, onSearch, onReset }) => {
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});

  // Helper to set a filter
  const handleChange = (name: string, value: string) => {
    setFilterValues((prev) => ({ ...prev, [name]: value }));
  };

  // For checkbox, if user unchecks, we can set an empty string (no filter).
  const handleCheckbox = (name: string, isChecked: boolean, checkboxValue: string) => {
    setFilterValues((prev) => ({
      ...prev,
      [name]: isChecked ? checkboxValue : ""
    }));
  };

  return (
    <div className="mb-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {fields.map((field, index) => {
          const fieldValue = filterValues[field.name] || "";

          return (
            <div key={index} className="mb-4">
              <label htmlFor={field.id} className="block text-sm font-medium">
                {field.title}
              </label>

              {/* TEXT */}
              {field.type === "text" && (
                <input
                  id={field.id}
                  type="text"
                  placeholder={field.placeholder}
                  value={fieldValue}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md py-2 px-2 shadow-md border"
                />
              )}

              {/* SELECT */}
              {field.type === "select" && field.options && (
                <select
                  id={field.id}
                  value={fieldValue}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className="mt-1  block w-full border-gray-300 rounded-md py-2 px-2 shadow-md border"
                >
                  <option value="">
                    {field.placeholder || `Select ${field.title}`}
                  </option>
                  {field.options.map((option, idx2) => (
                    <option key={idx2} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              )}

              {/* DATE */}
              {field.type === "date" && (
                <input
                  id={field.id}
                  type="date"
                  placeholder={field.placeholder}
                  value={fieldValue}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md py-2 px-2 shadow-md border"
                />
              )}

              {/* RADIO */}
              {field.type === "radio" && field.options && (
                <div className="mt-1">
                  {field.options.map((option, rIdx) => (
                    <label key={rIdx} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name={field.name}
                        value={option.value}
                        checked={fieldValue === option.value}
                        onChange={() => handleChange(field.name, option.value)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              )}

              {/* CHECKBOX */}
              {field.type === "checkbox" && (
                <div className="mt-1">
                  <label className="flex items-center space-x-2">
                    <input
                      id={field.id}
                      type="checkbox"
                      checked={fieldValue === (field.value || "on")}
                      onChange={(e) =>
                        handleCheckbox(field.name, e.target.checked, field.value || "on")
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span>{field.placeholder || field.title}</span>
                  </label>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ACTION BUTTONS */}
      <div className="mt-4 flex gap-4">
        <button
          onClick={() => onSearch(filterValues)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
        <button
          onClick={() => {
            setFilterValues({});
            onReset();
          }}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Filter;
