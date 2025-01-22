import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

interface ChartProps {
  title: string;
  type: "bar" | "pie" | "doughnut" | "line";
  dataEndpoint: string;
  filters?: { name: string; value: string }[]; // Optional filters for API requests
}

const ChartComponent: React.FC<ChartProps> = ({ title, type, dataEndpoint, filters = [] }) => {
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    const fetchChartData = async () => {
      setLoading(true);
      setError(null);

      try {
        console.log("Fetching chart data from:", dataEndpoint); // Debugging log
        const response = await fetch(dataEndpoint, {
          method: "GET", // Use GET for static JSON files
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch chart data: ${response.statusText}`);
        }

        const data = await response.json();

        // Validate the data structure
        if (!data.labels || !data.values) {
          throw new Error("Invalid chart data format. Ensure 'labels' and 'values' exist.");
        }

        console.log("Fetched chart data:", data); // Debugging log
        setChartData(data);
      } catch (err: any) {
        setError(err.message || "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, [dataEndpoint]);

  useEffect(() => {
    if (chartData && chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      // Destroy any existing chart instance
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      // Create a new chart instance
      chartInstanceRef.current = new Chart(ctx!, {
        type: type,
        data: {
          labels: chartData.labels,
          datasets: [
            {
              label: title,
              data: chartData.values,
              backgroundColor: chartData.colors || ["#4caf50", "#f44336", "#2196f3", "#ffeb3b"],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [chartData, type, title]);

  if (loading) return <p>Loading chart...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="mb-6">
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <canvas ref={chartRef} className="w-full h-64" style={{ maxWidth: "600px", maxHeight: "400px" }}></canvas>
    </div>
  );
};

export default ChartComponent;
