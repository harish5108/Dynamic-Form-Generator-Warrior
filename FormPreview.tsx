import React from 'react';
import { useForm } from 'react-hook-form';
import { FormSchema, Field } from './types';

interface FormPreviewProps {
  schema: FormSchema;
}

const FormPreview: React.FC<FormPreviewProps> = ({ schema }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = (data: any) => {
    console.log('Form data:', data);
    
    alert('Form submitted successfully!');

    // Call the function to download the form data as JSON
    downloadJson(data);
  };

   // Function to trigger the download of form data as JSON
   const downloadJson = (data: any) => {
    // Generate a timestamp in the format YYYY-MM-DD-HHMMSS
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19); // Removing the colon and dot, and slicing for a clean timestamp

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `form-submission-${timestamp}.json`;
    link.click();
    URL.revokeObjectURL(url); // Clean up the URL object after the download
  };

  const renderField = (field: Field) => {

    switch (field.type) {
      case 'text':
      case 'email':
        return (
          <div key={field.id}>
            <label htmlFor={field.id} className="block font-bold">{field.label}</label>
            <input
              type={field.type}
              id={field.id}
              {...register(field.id, { required: field.required})}
              placeholder={field.placeholder}
              className="w-full p-2 mt-1 text-black border rounded"
            />
            {errors[field.id] && <p className="text-red-500">{`${field.label} is required`}</p>}
          </div>
        );
      case 'select':
        return (
          <div key={field.id}>
            <label htmlFor={field.id} className="block font-bold">{field.label}</label>
            <select
              id={field.id}
              {...register(field.id, { required: field.required })}
              className="w-full p-2 mt-1 border text-black rounded"
            >
              {field.options?.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
            {errors[field.id] && <p className="text-red-500">{`${field.label} is required`}</p>}
          </div>
        );
      case 'radio':
        return (
          <div key={field.id}>
            <label className="block font-bold">{field.label}</label>
            <div className="flex screen flex-col lg:flex-row space-x lg:space-x-4">
              {field.options?.map((option) => (
                <label key={option.value} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    {...register(field.id, { required: field.required })}
                    value={option.value}
                    className="form-radio"
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
            {errors[field.id] && <p className="text-red-500">{`${field.label} is required`}</p>}
          </div>
        );
      case 'textarea':
        return (
          <div key={field.id}>
            <label htmlFor={field.id} className="block font-bold">{field.label}</label>
            <textarea
              id={field.id}
              {...register(field.id, { required: field.required })}
              placeholder={field.placeholder}
              className="w-full p-2 mt-1 text-black border rounded"
            />
            {errors[field.id] && <p className="text-red-500">{`${field.label} is required`}</p>}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-1 ">
      <h1 className="text-2xl lg:text-3xl font-bold">{schema.formTitle}</h1>
      <p>{schema.formDescription}</p>
      {schema.fields.map((field) => renderField(field))}
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200">Submit</button>
    </form>
  );
};

export default FormPreview;