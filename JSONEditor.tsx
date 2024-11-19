import React, { useState, useEffect } from 'react';

interface JSONEditorProps {
  onChange: (json: string) => void;
}

const JSONEditor: React.FC<JSONEditorProps> = ({ onChange }) => {
  const [jsonInput, setJsonInput] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonInput(e.target.value);
  };
  

  useEffect(() => {
    onChange(jsonInput);
  }, [jsonInput, onChange]);

  // Function to copy the JSON content to the clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsonInput).then(
      () => {
        // Optionally, you can show a success message or change button state
        alert('JSON copied to clipboard!');
      },
      (err) => {
        console.error('Failed to copy text: ', err);
      }
    );
  };

  return (
    <div className="h-full space-y-1">
      <textarea
        value={jsonInput}
        onChange={handleInputChange}
        className="w-full h-full p-2 border rounded bg-gray-900 text-white"
        placeholder="Paste your JSON schema here..."
      />
      <button
        onClick={copyToClipboard}
        className="px-4 py-2 my-5 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200">
        Copy Form JSON
      </button>
      
    </div>
  );
};

export default JSONEditor;