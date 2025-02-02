import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";
import Checkbox from "./Checkbox";
import Radio from "./Radio";
import Select from "./Select";
import MultiSelect from "./MultiSelect";
import FileInput from "./FileInput";
import SubmitButton from "./SubmitButton";
import ResetButton from "./ResetButton";
import TextArea from "./TextArea";
import ChildTable from "./ChildTable";

// const Form: React.FC<{ fields: any[] }> = ({ fields }) => {
  const Form: React.FC<{ fields: any[]; formKey: string }> = ({ fields, formKey }) => {
  // api logic
  // const { register, handleSubmit, reset } = useForm();

  // const onSubmit = (data: any) => {
  //   console.log("Form submitted:", data);
  // };

  // local logic to be removed
  const { register, handleSubmit, reset, setValue } = useForm();

  useEffect(() => {
    const savedData = localStorage.getItem(formKey);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      Object.keys(parsedData).forEach((key) => {
        setValue(key, parsedData[key]);
      });
    }
  }, [formKey, setValue]);

  const onSubmit = (data: any) => {
    console.log("Form submitted:", data);
    localStorage.setItem(formKey, JSON.stringify(data));
  };

  const handleReset = () => {
    console.log("reset function:", reset); // Debug reset
    try {
      reset(); // Reset form fields
      localStorage.removeItem(formKey);
      console.log("Form reset successfully and localStorage cleared.");
    } catch (error) {
      console.error("Error resetting the form:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, index) => {
        const { value, ...fieldProps } = field; // Extract value separately
        switch (field.type) {
          case "text":
            case "password":
            case "email":
            case "date":
            case "dateTime":
            case "tel":
            case "color":
            case "number":
            case "hidden":
            return <Input key={index} {...fieldProps} value={value} register={register} />;
            case 'child_table':
      return <ChildTable key={index} {...field} />;
          case "textarea":
            return <TextArea key={index} {...fieldProps} value={value} register={register} />;
          case "checkbox":
            return <Checkbox key={index} {...fieldProps} value={value} register={register} />;
          case "radio":
            return <Radio key={index} {...fieldProps} value={value} register={register} />;
          case "select":
            return <Select key={index} {...fieldProps} value={value} register={register} />;
          case "multiSelect":
            return <MultiSelect key={index} {...fieldProps} value={value} register={register} />;
          case "file":
            return <FileInput key={index} {...fieldProps} value={value} register={register} />;
          case "submit":
            return <SubmitButton key={index} {...fieldProps} />;
          case "reset":
            return <button
            type="button"
            onClick={() => {
              console.log("Direct Reset button clicked");
              handleReset();
            }}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Reset
          </button>
         // TODO:doest work wait for phase 3 api integration <ResetButton key={index} {...fieldProps}   onClick={handleReset} />;
         // onClick={reset} for api logic shltha bas 3shan agrab a3ml update ll local storage
          default:
            return null;
        }
      })}
    </form>
  );
};

export default Form;
