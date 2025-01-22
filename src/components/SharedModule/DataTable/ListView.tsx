import React, { useEffect, useState } from "react";
import axios from "axios";

interface Filter {
  name: string;
  title: string;
  type: string;
  options?: { label: string; value: string }[];
  value?: string;
}

interface ListViewProps {
  endpoint: string; // API endpoint to fetch list data
  filters?: Filter[]; // Array of filter configurations
}

const ListView: React.FC<ListViewProps> = ({ endpoint, filters = [] }) => {
  const [columns, setColumns] = useState<any[]>([]);
  const [rows, setRows] = useState<any[]>([]);
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // useEffect(() => {
  //   const fetchListData = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await axios.post(endpoint, {
  //         filters: filterValues,
  //         page: currentPage,
  //       });
  //       setColumns(response.data.columns || []);
  //       setRows(response.data.rows || []);
  //       setTotalPages(response.data.totalPages || 1);
  //     } catch (error) {
  //       console.error("Error fetching list data:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchListData();
  // }, [endpoint, filterValues, currentPage]);
  // el gy 3shan el axios mabyt3amlsh ma3 static post request 
  useEffect(() => {
    const fetchListData = async () => {
      console.log("Fetching data from endpoint:", endpoint); // Log the endpoint
      setLoading(true);
      try {
        // const response = await axios.get(endpoint); // Ensure the method is GET
        const response = await axios.get(`${window.location.origin}${endpoint}`);
        console.log("Data fetched from API:", response.data); // Log the fetched data
        setColumns(response.data.columns || []);
        setRows(response.data.rows || []);
      } catch (error) {
        console.error("Error fetching list data:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchListData();
  }, [endpoint]);

  const handleFilterChange = (name: string, value: string) => {
    setFilterValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleExport = async (format: string) => {
    try {
      const response = await axios.post(`${endpoint}/export`, {
        filters: filterValues,
        format,
      });
      const blob = new Blob([response.data], { type: "application/octet-stream" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `data.${format.toLowerCase()}`;
      link.click();
    } catch (error) {
      console.error(`Error exporting data as ${format}:`, error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  console.log("Columns in render:", columns);
  console.log("Rows in render:", rows);
  if (loading) return <p>Loading list...</p>;
 
  return (
    <div>
      {/* Filters Section */}
      {filters.length > 0 && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Filters</h3>
          <div className="grid grid-cols-2 gap-4">
            {filters.map((filter, index) => (
              <div key={index}>
                <label className="block text-sm font-medium mb-1" htmlFor={filter.name}>
                  {filter.title}
                </label>
                {filter.type === "text" && (
                  <input
                    id={filter.name}
                    type="text"
                    value={filterValues[filter.name] || ""}
                    onChange={(e) => handleFilterChange(filter.name, e.target.value)}
                    className="border px-4 py-2 w-full"
                  />
                )}
                {filter.type === "select" && (
                  <select
                    id={filter.name}
                    value={filterValues[filter.name] || ""}
                    onChange={(e) => handleFilterChange(filter.name, e.target.value)}
                    className="border px-4 py-2 w-full"
                  >
                    <option value="">Select {filter.title}</option>
                    {filter.options?.map((option, i) => (
                      <option key={i} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                )}
                {/* Add other filter types as needed */}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="mb-4 flex gap-4">
        <button onClick={() => handleExport("PDF")} className="bg-red-500 text-white px-4 py-2 rounded">
          Export as PDF
        </button>
        <button onClick={() => handleExport("Excel")} className="bg-green-500 text-white px-4 py-2 rounded">
          Export as Excel
        </button>
        <button onClick={() => handleExport("Print")} className="bg-blue-500 text-white px-4 py-2 rounded">
          Print
        </button>
      </div>

      {/* DataTable Section */}
      <table className="table-auto w-full border-collapse border border-gray-300">
        {/* <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index} className="border px-4 py-2 text-left">
                {col.title}
              </th>
            ))}
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="border px-4 py-2">
                    {row[col.name]}
                  </td>
                ))}
                <td>
                  <button onClick={() => console.log("Edit:", row)} className="bg-blue-500 text-white px-4 py-2 rounded">
                    Edit
                  </button>
                  <button onClick={() => console.log("Delete:", row)} className="bg-red-500 text-white px-4 py-2 rounded ml-2">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + 1} className="text-center py-4">
                No data available
              </td>
            </tr>
          )}
        </tbody> */}
        <thead>
  <tr>
    {columns.map((col, index) => (
      <th key={index} className="border px-4 py-2 text-left">
        {col.title}
      </th>
    ))}
    <th className="border px-4 py-2">Actions</th>
  </tr>
</thead>
<tbody>
  {rows.length > 0 ? (
    rows.map((row, rowIndex) => (
      <tr key={rowIndex}>
        {columns.map((col, colIndex) => (
          <td key={colIndex} className="border px-4 py-2">
            {row[col.name]} {/* Ensure the correct key is being accessed */}
          </td>
        ))}
        <td>
          <button onClick={() => console.log("Edit:", row)} className="bg-blue-500 text-white px-4 py-2 rounded">
            Edit
          </button>
          <button onClick={() => console.log("Delete:", row)} className="bg-red-500 text-white px-4 py-2 rounded ml-2">
            Delete
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={columns.length + 1} className="text-center py-4">
        No data available
      </td>
    </tr>
  )}
</tbody>

      </table>

      {/* Pagination Section */}
      <div className="mt-4 flex justify-center">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`px-4 py-2 mx-1 ${currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"} rounded`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};




export default ListView;
