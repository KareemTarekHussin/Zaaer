import { useEffect, useState } from "react";
import Form from "../components/SharedModule/Form/Form"; // Import the generic Form component
import { useParams } from "react-router-dom";
import { loadForm, saveForm, updateForm } from "../services/api";

const FormPage: React.FC = () => {
  const { mode, id } = useParams<{ mode: string; id: string }>(); // mode: 'add' or 'edit', id: existing record ID
  const [formStructure, setFormStructure] = useState<any[]>([]); // Fields structure
  const [formData, setFormData] = useState<any>({}); // Initial form data
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    loadForm("finance") // Replace "modelName" with the appropriate model
      .then((response) => {
        console.log("Form structureeeeeeeeeeeeeeee fetched:", response.data.fields);
        setFormStructure(response.data.fields || []); // Set the fields structure
        setFormData(response.data.values || {}); // Pre-fill form data for 'edit' mode
      })
      .catch((error) => console.error("Error loading form:", error))
      .finally(() => setLoading(false));
  }, [mode, id]);

  const handleSave = () => {
    setLoading(true);
    const apiCall = mode === "add"
      ? saveForm("modelName", formData) // Save for 'add' mode
      : updateForm("modelName", id, formData); // Update for 'edit' mode

    apiCall
      .then(() => alert("Form saved successfully!"))
      .catch((error) => console.error("Error saving form:", error))
      .finally(() => setLoading(false));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">{mode === "add" ? "Add New Record" : "Edit Record"}</h1>
      <Form fields={formStructure} /> {/* Pass the dynamic fields to Form.tsx */}
      <button
        type="button"
        onClick={handleSave}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Save
      </button>
    </div>
  );
};

export default FormPage;
