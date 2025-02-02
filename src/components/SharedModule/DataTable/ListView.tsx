import React, { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

interface Column {
  title: string;
  name: string;
}

interface RowData {
  [key: string]: any;
}

interface FilterValues {
  [key: string]: string;
}

interface ListViewProps {
  columns: Column[];               // The columns array from config
  rows: RowData[];                 // The rows array from config
  totalPages?: number;             // If you want a preset totalPages or you can compute it
  filters?: FilterValues;          // e.g. { username: "Alice" }
}

const ListView: React.FC<ListViewProps> = ({
  columns = [],
  rows = [],
  totalPages: initialTotalPages = 1,
  filters = {}
}) => {
  const [displayedRows, setDisplayedRows] = useState<RowData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(initialTotalPages);


  // for server side filter in phase 3
  // const handleSearch = (filters: Record<string, string>) => {
  //   // 2frd e7na bn3ml a POST call to server with these filters
  //   axios
  //     .post("/api/v1/load/list/reservation", { filters })
  //     .then((response) => {
  //       // The backend mafrood yrga3 { columns, rows, totalPages, etc. }
  //       setColumns(response.data.columns);
  //       setRows(response.data.rows);
  //     })
  //     .catch((err) => console.error(err));
  // };
  // taree2a tanya
  // const handleSearch = async (filters) => {
  //   try {
  //     const response = await axios.post("/api/v1/load/list/reservations", { filters });
  //     setRows(response.data.rows);
  //     setColumns(response.data.columns);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
  useEffect(() => {
    if (!rows.length) {
      setDisplayedRows([]);
      setCurrentPage(1);
      return;
    }
  
    let newFiltered = [...rows];
  
    Object.entries(filters).forEach(([filterName, filterValue]) => {
      // skip if blank or trimmed is empty
      if (!filterValue.trim()) return;
  
      if (filterName === "start_date") {
        // Filter rows whose created_date >= filterValue
        newFiltered = newFiltered.filter((row) => {
          if (!row.created_date) return false;
          const rowDate = new Date(row.created_date);
          const filterDate = new Date(filterValue);
          return rowDate >= filterDate;
        });
      }
     else if (filterName === "username") {
        newFiltered = newFiltered.filter(row =>
          row.username.toLowerCase().includes(filterValue.toLowerCase())
        );
      }
      else if (filterName === "name") {
        // Compare row.name
        newFiltered = newFiltered.filter((row) =>
          row.name?.toLowerCase().includes(filterValue.toLowerCase())
        );
      }
      else if (filterName === "department") {
        // Compare row.department
        newFiltered = newFiltered.filter(
          (row) => row.department === filterValue
        );
      }
      else if (filterName === "status") {
        // Compare row.status
        newFiltered = newFiltered.filter(
          (row) => row.status?.toLowerCase() === filterValue.toLowerCase()
        );
      }
      else if (filterName === "include_archived") {
        // If user wants archived => 'yes'; skip rows that are not archived logic
        // But we need row.isArchived or row.archived property to compare
        // Example:
        if (filterValue === "yes") {
          // user wants to include archived => do nothing
          // or if we only want archived rows, do newFiltered = newFiltered.filter(r => r.archived)
        } else {
          // user does not want archived => filter out archived
          newFiltered = newFiltered.filter((row) => !row.archived);
        }
      }
      // handle other keys as needed ba3deen momken ashlha asasan 3shan da local
    });
  
    setDisplayedRows(newFiltered);
    setCurrentPage(1);
  }, [filters, rows]);

  // Calculate current page slice
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex   = startIndex + rowsPerPage;
  const pageRows   = displayedRows.slice(startIndex, endIndex);

  // Pagination controls
  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // Simple CSV export
  const handleExportCSV = () => {
    try {
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
    } catch (error) {
      console.error("Error exporting CSV:", error);
    }
  };

  return (
    <div className="py-4">
      {/* Export Button Example */}
      <div className="mb-4">
        <button onClick={handleExportCSV} className="bg-blue-500 text-white px-4 py-2 rounded">
          Export CSV
        </button>
      </div>

      {/* Table Heading */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold">List View</h2>
          <p className="text-sm text-gray-600">Some description here</p>
        </div>
        <button className="bg-indigo-500 text-white px-3 py-2 rounded">Add New</button>
      </div>

      <div className="mt-4 flow-root px-3">
        <div className="-mx-4 -my-2 overflow-x-auto">
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="overflow-hidden ring-1 ring-black/5 shadow-sm sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    {columns.map((col, idx) => (
                      <th
                        key={idx}
                        className="py-3 px-4 text-left text-sm font-semibold text-gray-900"
                      >
                        {col.title}
                      </th>
                    ))}
                    <th className="py-3 px-7 text-right text-sm font-semibold text-gray-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {pageRows.map((row, rIdx) => (
                    <tr key={rIdx}>
                      {columns.map((col, cIdx) => (
                        <td
                          key={cIdx}
                          className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap"
                        >
                          {row[col.name]}
                        </td>
                      ))}
                      <td className="px-4 py-3 text-sm text-right">
                        <button className="text-indigo-600 hover:text-indigo-900 mr-2">
                          Edit
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}

                  {pageRows.length === 0 && (
                    <tr>
                      <td
                        colSpan={columns.length + 1}
                        className="text-center py-4 text-sm text-gray-500"
                      >
                        {/* TODO:replace with picture  */}
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

      {/* Pagination */}
      <div className="flex items-center justify-between border rounded-2xl border-gray-200 bg-white mt-4 px-4 py-4 ">
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

        {/* Desktop */}
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between ">
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
              <span
                className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 
                           text-sm font-semibold text-white focus:z-20 
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
