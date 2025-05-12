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
        const { onChange: rhfOnChange, ...restField } = field;

        // console.log(fieldState, field);

        return cloneElement(child, {
          ...restField,
          error: fieldState.error?.message,
          onChange: (e: unknown) => {
            rhfOnChange(e);
            child.props.onChange?.(e);
          },
        });
      }}
    />
  );
}
