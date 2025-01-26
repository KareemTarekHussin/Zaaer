import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

interface ListViewProps {
  endpoint: string; // e.g. "/mock-api/users.json"
  filters?: Record<string, string>; // e.g. { name: "Lindsay", role: "Member" }
}

const ListView: React.FC<ListViewProps> = ({ endpoint, filters = {} }) => {
  const [columns, setColumns] = useState<any[]>([]);
  const [rows, setRows] = useState<any[]>([]);
  const [displayedRows, setDisplayedRows] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  // 1) Fetch data
  useEffect(() => {
    const fetchListData = async () => {
      setLoading(true);
      setError(null);

      try {
        // If you’re in Phase 1, this might be a local .json file:
        // e.g. "/mock-api/users.json"
        const response = await axios.get(endpoint);
        const data = response.data;

        setColumns(data.columns || []);
        setRows(data.rows || []);
        setDisplayedRows(data.rows || []);

        // Set total pages
        const total = (data.rows || []).length;
        setTotalPages(Math.ceil(total / rowsPerPage));
      } catch (err: any) {
        console.error("Error fetching list data:", err);
        setError("Failed to load list data.");
      } finally {
        setLoading(false);
      }
    };

    fetchListData();
  }, [endpoint, rowsPerPage]);

  // 2) Local filtering (if using)
  useEffect(() => {
    if (!rows.length) {
      setDisplayedRows([]);
      return;
    }

    let newFiltered = [...rows];

    // For each filter key
    Object.entries(filters).forEach(([filterName, filterValue]) => {
      if (!filterValue.trim()) return; // ignore empty
      newFiltered = newFiltered.filter((row) => {
        const rowVal = (row[filterName] || "").toString().toLowerCase();
        return rowVal.includes(filterValue.toLowerCase());
      });
    });

    setDisplayedRows(newFiltered);
    setCurrentPage(1);

    const total = newFiltered.length;
    setTotalPages(Math.ceil(total / rowsPerPage));
  }, [filters, rows, rowsPerPage]);

  // 3) Pagination slice
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const pageRows = displayedRows.slice(startIndex, endIndex);

  // 4) Export
  const handleExport = (format: string) => {
    try {
      if (format === "CSV") {
        let csvContent = columns.map((c) => c.title).join(",") + "\n";
        displayedRows.forEach((row) => {
          const rowData = columns.map((col) => row[col.name]).join(",");
          csvContent += rowData + "\n";
        });
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "data.csv";
        link.click();
        URL.revokeObjectURL(url);
      } else {
        alert(`Local export to ${format} not implemented yet!`);
      }
    } catch (error) {
      console.error(`Error exporting data as ${format}:`, error);
    }
  };

  // 5) Pagination handlers
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // ---------------------------------------
  //      >>> RETURN STATEMENT <<<
  // ---------------------------------------
  if (loading) return <p>Loading list...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="py-4">
      {/* Export Buttons */}
      <div className="mb-4 flex gap-4">
        <button
          onClick={() => handleExport("PDF")}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Export as PDF
        </button>
        <button
          onClick={() => handleExport("Excel")}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Export as Excel
        </button>
        <button
          onClick={() => handleExport("CSV")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Export as CSV
        </button>
      </div>

      {/* Table Heading Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-base font-semibold text-gray-900">Users</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the users in your account including name, title, email, and role.
          </p>
        </div>
        <div>
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm
                       font-semibold text-white shadow-xs hover:bg-indigo-500
                       focus-visible:outline-2 focus-visible:outline-offset-2
                       focus-visible:outline-indigo-600"
          >
            Add user
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="mt-4 flow-root">
        <div className="-mx-0 -my-2 overflow-x-auto">
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="overflow-hidden ring-1 ring-black/5 shadow-sm sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    {columns.map((col, idx) => (
                      <th
                        key={idx}
                        scope="col"
                        className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                      >
                        {col.title}
                      </th>
                    ))}
                    <th scope="col" className="relative py-3.5 pr-4 pl-3 sm:pr-6">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {pageRows.map((rowItem, rowIndex) => (
                    <tr key={rowIndex}>
                      {columns.map((col, colIndex) => (
                        <td
                          key={colIndex}
                          className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap"
                        >
                          {rowItem[col.name]}
                        </td>
                      ))}
                      <td className="relative py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-6">
                        <button
                          onClick={() => console.log("Edit:", rowItem)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit
                          <span className="sr-only">, {rowItem.name}</span>
                        </button>
                      </td>
                    </tr>
                  ))}

                  {/* If no data after filtering/pagination */}
                  {pageRows.length === 0 && (
                    <tr>
                      <td
                        colSpan={columns.length + 1}
                        className="py-4 text-center text-sm text-gray-500"
                      >
                        No data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* PAGINATION */}
      <div className="flex items-center justify-between border-t border-gray-200 bg-white mt-4 px-4 py-3">
        {/* Mobile "Previous/Next" */}
        <div className="flex flex-1 justify-between sm:hidden">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="relative inline-flex items-center rounded-md border border-gray-300
                       bg-white px-4 py-2 text-sm font-medium text-gray-700
                       hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300
                       bg-white px-4 py-2 text-sm font-medium text-gray-700
                       hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>

        {/* Desktop pagination */}
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-medium">{pageRows.length ? startIndex + 1 : 0}</span>{" "}
              to{" "}
              <span className="font-medium">
                {endIndex > displayedRows.length ? displayedRows.length : endIndex}
              </span>{" "}
              of <span className="font-medium">{displayedRows.length}</span> results
            </p>
          </div>
          <div>
            <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-sm">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400
                           ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20
                           focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              {/* Current page */}
              <span
                className="relative z-10 inline-flex items-center bg-indigo-600
                           px-4 py-2 text-sm font-semibold text-white focus:z-20
                           focus-visible:outline-2 focus-visible:outline-offset-2
                           focus-visible:outline-indigo-600"
              >
                {currentPage}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400
                           ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20
                           focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListView;
