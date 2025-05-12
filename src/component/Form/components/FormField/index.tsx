import React, { cloneElement } from 'react';
import { FormFieldProps } from '../../types/IForm';
import { Controller } from 'react-hook-form';
import { useFormContextSafe } from '../../hooks/useFormContextSave';

export default function FormField({ name, child }: FormFieldProps) {
  const { control } = useFormContextSafe();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        // console.log(fieldState, field);

        return cloneElement(child, {
          ...field,
          error: fieldState.error?.message,
        });
      }}
    />
  );
}
