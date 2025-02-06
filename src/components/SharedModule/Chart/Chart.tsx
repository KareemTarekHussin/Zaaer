// ChartInline.tsx
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

interface InlineChartData {
  labels: string[];
  values: number[];
  colors?: string[];
}

interface ChartComponenet {
  title: string;
  type: "bar" | "pie" | "doughnut" | "line";
  chartData: InlineChartData;
}

const ChartComponenet: React.FC<ChartComponenet> = ({ title, type, chartData }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartData && chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      // Destroy any existing chart instance
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      // Create a new chart
      chartInstanceRef.current = new Chart(ctx!, {
        type,
        data: {
          labels: chartData.labels,
          datasets: [
            {
              label: title,
              data: chartData.values,
              backgroundColor: chartData.colors || ["#4caf50","#f44336","#2196f3","#ffeb3b"]
            }
          ]
        },
        options: { responsive: true, maintainAspectRatio: false }
      });
    }

    // Cleanup
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [chartData, title, type]);

  return (
    <div className="mb-6">
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <div style={{ width: "600px", height: "400px" }}>
        <canvas ref={chartRef} />
      </div>
    </div>
  );
};

export default ChartComponenet;
