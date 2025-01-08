import React, { useEffect, useState } from 'react';

const Dashboard: React.FC = () => {
  const [data, setData] = useState({ bookings: 0, revenue: 0, occupancy: 0 });

  useEffect(() => {
    // Fetch dashboard data from API
    const fetchData = async () => {
      const response = await fetch('/api/dashboard');
      const result = await response.json();
      setData(result);
    };
    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <div className="metrics">
        <div>Bookings: {data.bookings}</div>
        <div>Revenue: ${data.revenue}</div>
        <div>Occupancy: {data.occupancy}%</div>
        {/* i will add others if needed */}
      </div>
    </div>
  );
};

export default Dashboard;
