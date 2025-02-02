import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { loadPageConfig } from "../services/api";
import Filter from "../components/SharedModule/DataTable/Filters";
import ListView from "../components/SharedModule/DataTable/ListView";
import ChartComponent from "../components/SharedModule/Chart/Chart";
import Form from "../components/SharedModule/Form/Form";

const DynamicPage: React.FC = () => {
  const { pageName } = useParams<{ pageName: string }>();
  const [pageConfig, setPageConfig] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!pageName) return;

    setLoading(true);
    setError(null);

    loadPageConfig(pageName)
      .then((config) => {
        setPageConfig(config);
      })
      .catch((err) => {
        console.error("Error fetching page configuration:", err);
        setError("Failed to load page configuration.");
      })
      .finally(() => setLoading(false));
  }, [pageName]);

  const handleSearch = (filters: Record<string, string>) => {
    setFilterValues(filters);
  };

  const handleReset = () => {
    setFilterValues({});
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!pageConfig) return <p>No configuration available for this page.</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">{pageConfig.pageTitle}</h1>
      {pageConfig.components.map((component: any, index: number) => {
        switch (component.type) {
          case "filter":
            return (
              <Filter
                key={index}
                {...component.config}
                onSearch={handleSearch}
                onReset={handleReset}
              />
            );
          case "list":
            return <ListView
            key={index}
            columns={component.config.columns || []}
            rows={component.config.rows || []}
            totalPages={component.config.totalPages || 1}
            filters={filterValues}
            />;
          case "chart":
            return component.config.charts.map((chartConfig: any, chartIndex: number) => (
              <ChartComponent
                key={`${index}-${chartIndex}`}
                title={chartConfig.title}
                type={chartConfig.type}
                dataEndpoint={chartConfig.dataEndpoint}
                filters={chartConfig.filters || []}
              />
            ));
          case "form":
            return <Form key={index} fields={component.config.fields}  formKey="megaForm"/>;
          default:
            return <p key={index}>Unknown component type: {component.type}</p>;
        }
      })}
    </div>
  );
};

export default DynamicPage;
