import React, { useState, useEffect } from 'react';
import { FormSchema } from './types';
import JSONEditor from './JSONEditor';
import FormPreview from './FormPreview';
import Header from './Header';
import Footer from './Footer';

const App: React.FC = () => {
  const [schema, setSchema] = useState<FormSchema | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const handleJSONChange = (json: string) => {
    try {
      const parsedSchema: FormSchema = JSON.parse(json);
      setSchema(parsedSchema);
    } catch (e) {
      console.error('Invalid JSON:', e);
      setSchema(null);
    }
  };

  // Toggle between dark and light mode
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };
  // Use `useEffect` to save the theme preference in localStorage and apply it on reload
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    // Save the selected theme in localStorage
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    // Apply the theme class to the body element
    document.body.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return (<>
    <Header/>
    <div className={`flex flex-col lg:flex-row screen m-2 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <div className="w-full w-1/2 p-4 border lg:border-r">
        <JSONEditor onChange={handleJSONChange} />
      </div>
      <div className="w-full lg:w-1/2 p-4 lg:border-r ">
        {schema ? <FormPreview schema={schema}  /> : <p className="text-red-500 text-sm lg:text-base">Invalid JSON schema</p>}
      </div>
      {/* Dark mode toggle button */}
      <button
        className="fixed top-4 right-4 lg:p-3 p-1.5 transition-all shadow-lg bg-blue-500 hover:bg-blue-600 text-white rounded-full"
        onClick={toggleDarkMode}
      >
        {isDarkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
      </button>
    </div>
    <Footer/>
  </>);
};

export default App;