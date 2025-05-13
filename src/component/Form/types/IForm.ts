import { FieldValues, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';

export interface FormProps {
  defaultValues: Record<string, unknown>;
  validationSchema: Yup.ObjectSchema<Record<string, unknown>>;
  onSubmit: SubmitHandler<FieldValues>;
  children?: React.ReactNode;
}

export interface FormFieldProps {
  name: string;
  child: React.ReactElement<{ error?: string; onChange?: (e: unknown) => void }>;
}
