import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getReport } from '../services/api';

const ReportPage: React.FC = () => {
  const { reportType } = useParams(); // Determines which report to load
  const [reportData, setReportData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getReport(reportType)
      .then((response) => setReportData(response.data)) // Assuming the backend returns report data
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [reportType]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : reportData ? (
        <div>
          <h1>{reportData.title}</h1>
          <p>{reportData.summary}</p>
          {/* Render report details */}
        </div>
      ) : (
        <p>No report data available</p>
      )}
    </div>
  );
};

export default ReportPage;
