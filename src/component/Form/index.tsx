'use client';

import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { DefaultValues, Resolver, useForm } from 'react-hook-form';
import { FormProps } from './types/IForm';
import FormField from './components/FormField';
import { withProperties } from '@/utils/types';
import { FormContext } from './hooks/useFormContextSave';
function Form({ defaultValues, validationSchema, onSubmit, children }: FormProps) {
  const { control, handleSubmit } = useForm({
    defaultValues: defaultValues as DefaultValues<Record<string, unknown>>,
    resolver: yupResolver(validationSchema) as Resolver,
  });

  //   console.log(getValues('firstName'));

  return (
    <FormContext.Provider value={{ control }}>
      <form onSubmit={handleSubmit(onSubmit)}>{children}</form>
    </FormContext.Provider>
  );
}

export default withProperties(Form, { FormField });
