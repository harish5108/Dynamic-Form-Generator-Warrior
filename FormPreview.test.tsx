import { render, screen } from '@testing-library/react';
import { FormSchema } from './types';
import FormPreview from './FormPreview';

const schema: FormSchema = {
  formTitle: 'Test Form',
  formDescription: 'This is a test form',
  fields: [
    { id: 'name', type: 'text', label: 'Full Name', required: true },
    { id: 'email', type: 'email', label: 'Email Address', required: true, validation: { pattern: '^[^@]+@[^@]+$',message:'Please enter a valid email address' } },
    { id: 'companySize', type: 'select', label: 'Company Size', required: true, options: [{ value: '1-50', label: '1-50 employees' },
                                                                               { value: "51-200", label: "51-200 employees" },
                                                                               { value: "201-1000", label: "201-1000 employees" }, 
                                                                               { value: "1000+", label: "1000+ employees" }] },
    { id: 'industry', type: 'radio', label: 'Industry', required: true, options: [{ value: "tech", label: "Technology" },
                                                                                  { value: "healthcare", label: "Healthcare" },
                                                                                  { value: "finance", label: "Finance" },
                                                                                  { value: "retail", label: "Retail" },
                                                                                  { value: "other", label: "Other" }] }, 
    { id: 'timeline', type: 'select', label: 'Project Timeline', required: true, options: [{ value: "immediate", label: "Immediate (within 1 month)" },
                                                                                  { value: "short", label: "Short-term (1-3 months)" },
                                                                                  { value: "medium", label: "Medium-term (3-6 months)" },
                                                                                  { value: "long", label: "Long-term (6+ months)" },] },                                                                          
    { id: 'comments', type: 'textarea', label: 'Additional Comments', required: false },
  ],
};

test('renders form fields correctly', () => {
  render(<FormPreview schema={schema} />);
  expect(screen.getByLabelText(/Full Name/)).toBeInTheDocument();
  expect(screen.getByLabelText(/Email Address/)).toBeInTheDocument();
  expect(screen.getByLabelText(/Company Size/)).toBeInTheDocument();
  expect(screen.getByLabelText(/Industry/)).toBeInTheDocument();
  expect(screen.getByLabelText(/Project Timeline/)).toBeInTheDocument();
  expect(screen.getByLabelText(/Additional Comments/)).toBeInTheDocument();
});