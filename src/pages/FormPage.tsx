import { useEffect, useState } from "react";
import {Input} from "../components/SharedModule/Form/Input";
import SubmitButton from "../components/SharedModule/Form/SubmitButton";
import { useParams } from "react-router-dom";
import { loadForm,saveForm,updateForm } from "../services/api";

const FormPage: React.FC = () => {
  const { mode, id } = useParams(); // mode: 'add' or 'edit', id: existing record ID
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if (mode === 'edit' && id) {
      setLoading(true);
      loadForm('modelName')
        .then((response) => {
          setFormData(response.data); // Assuming the backend returns form data structure
        })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }
  }, [mode, id]);

  const handleSave = () => {
    setLoading(true);
    const saveMethod = mode === 'add' ? saveForm : updateForm;
    const apiCall = mode === 'add'
    //error lazm akml el id  argument ana zawdtha momken y3ml moshkla
      ? saveMethod('modelName',id, formData)
      : saveMethod('modelName', id, formData);

    apiCall
      .then(() => alert('Form saved successfully!'))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };
  return (
    <>
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="p-6 bg-gray-100 min-h-screen">
          <h1 className="text-2xl font-bold mb-4">Form Page</h1>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          {/* Render form fields dynamically based on formData */}
          {/* added input componenet 3shan agrab UI */}
          <Input
            type="text"
            value={formData.name || ''}
            onChange={(e:any) => setFormData({ ...formData, name: e.target.value })}
          />
          <button type="button" onClick={handleSave}>
            Save
          </button>
        </form>
        </div>
       
      )}
    </div>
    </>
  );
};

export default FormPage;