import React from 'react';

interface ChildTableProps {
  name: string;
  title: string;
  id: string;
  type: string; // "child_table"
  options: {
    model: string;
    linked_model: string;
    filters: any[];  // array of filter objects
    columns: any[];  // array of column objects
    rows: any[];     // array of row data
  };
  // possibly other props like "mandatory", "depends_on", etc.
}

const ChildTable: React.FC<ChildTableProps> = ({ name, title, id, options }) => {
  const { model, linked_model, filters, columns, rows } = options;

  return (
    <div className="mt-4">
      <h3 className="font-bold mb-2">{title} (Child Table)</h3>

      {/* Render child-table filters if you want */}
      <div className="mb-2">
        {filters.map((f: any, index: number) => (
          <div key={index} className="inline-block mr-2">
            {f.type === "text" && (
              <input
                type="text"
                placeholder={f.title}
                value={f.value || ""}
                onChange={() => { /* handle changes if needed */ }}
              />
            )}
            {f.type === "select" && (
              <select value={f.value || ""}>
                {/* e.g. f.options might be [ {1: 'Guest 1'}, {2: 'Guest 2'} ] */}
                <option value="">-- Select --</option>
                {f.options.map((optObj: any, i: number) => {
                  const [val, label] = Object.entries(optObj)[0] as [string, string];
                  return <option key={i} value={val}>{label}</option>;
                })}
              </select>
            )}
          </div>
        ))}
      </div>

      {/* Render a table for columns/rows */}
      <table className="min-w-full border">
        <thead>
          <tr>
            {columns.map((col: any, cindex: number) => (
              <th key={cindex} className="border px-2 py-1">
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row: any, rindex: number) => (
            <tr key={rindex}>
              {columns.map((col: any, cindex: number) => (
                <td key={cindex} className="border px-2 py-1">
                  {row[col.name]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChildTable;
