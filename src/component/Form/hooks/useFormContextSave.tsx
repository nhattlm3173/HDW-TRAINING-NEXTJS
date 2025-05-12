import { createContext, useContext } from 'react';
import { Control, FieldValues } from 'react-hook-form';

interface FormContextProps {
  control: Control<FieldValues>;
}

export const FormContext = createContext<FormContextProps | undefined>(undefined);

export function useFormContextSafe() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('FormField must be used within a Form');
  }
  return context;
}
