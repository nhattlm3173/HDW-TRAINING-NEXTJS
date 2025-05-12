'use client';

import React from 'react';
import { SubmitHandler } from 'react-hook-form';
// import { IFormInput } from '../../types/IFormInput';
import { ToastType } from '@/component/Toast/types/IToast';
import { useToast } from '@/component/Toast/hooks/useToast';
import Button from '@/component/ui/Button';
import Form from '@/component/Form';
import * as yup from 'yup';
import Input from '@/component/ui/Input';
import Dropdown from '@/component/ui/Dropdown';

export default function TestForm() {
  const { showToast } = useToast();

  const onSubmit: SubmitHandler<Record<string, unknown>> = data => {
    console.log(data);
  };

  const schema = yup
    .object({
      firstName: yup.string().required(),
      lastName: yup.string().required(),
      // age: yup.number().positive().integer().required(),
      iceCreamType: yup.string().required(),
    })
    .required();

  // console.log(Form.FormField);

  return (
    <Form
      onSubmit={onSubmit}
      defaultValues={{
        firstName: '',
        lastName: '',
        iceCreamType: {
          value: '',
        },
      }}
      validationSchema={schema}
    >
      <Form.FormField
        name={'firstName'}
        child={<Input label="firstName" placeholder="Enter your first Name" />}
      />

      <Form.FormField
        name={'lastName'}
        child={<Input label="lastName" placeholder="Enter your last Name" />}
      />

      <Form.FormField
        name={'iceCreamType'}
        child={
          <Dropdown
            name="iceCreamType"
            label="Ice cream type"
            placeholder="Choose Ice cream type"
            options={[
              { label: 'Straw berry', value: 'strawBerry' },
              { label: 'Chocolate', value: 'chocolate' },
              { label: 'Blue berry', value: 'blueBerry', disabled: true },
            ]}
          />
        }
      />

      {/* <Form.FormField name={'submit'} child={} /> */}

      <Button onClick={() => showToast('Submit!', ToastType.SUCCESS)} label="Submit" />
    </Form>
  );
}
