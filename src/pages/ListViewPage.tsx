import { useEffect, useState } from "react";
import { getList } from '../services/api';


const ListViewPage: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(false);
  const mockData = [
    { id: 1, name: "Room 101", price: "$100" },
    { id: 2, name: "Room 102", price: "$120" },
  ];
  useEffect(() => {
    setLoading(true);
    getList('modelName', filters)
      .then((response) => setItems(response.data)) // Assuming the backend returns a list of items
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [filters]);

  const handleFilterChange = (filterKey: string, value: any) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filterKey]: value }));
  };
  return (
    <div className="p-6">
       <div>
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => handleFilterChange('search', e.target.value)}
        />
      </div>
      <h1 className="text-2xl font-bold mb-4">List View</h1>
      {/* {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )} */}
      <table className="table-auto w-full bg-white shadow-md rounded">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Price</th>
          </tr>
        </thead>
        <tbody>
          {mockData.map((item) => (
            <tr key={item.id}>
              <td className="border px-4 py-2">{item.id}</td>
              <td className="border px-4 py-2">{item.name}</td>
              <td className="border px-4 py-2">{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListViewPage;
