'use client';

import React from 'react';
import { WarningOutlined } from '@ant-design/icons';
import { RadioProps } from './types/IRadio';

export default function Radio({ label, error, className = '', ...props }: RadioProps) {
  return (
    <div className="mx-1 my-3 flex w-fit flex-col space-y-1">
      <label className="flex w-fit items-center space-x-2">
        <input
          type="radio"
          className={`h-5 w-5 rounded-full border-gray-300 text-indigo-600 ${error ? 'border-red-500 focus:ring-red-500' : ''} cursor-pointer disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-100 ${className}`}
          {...props}
        />
        <span
          className={`text-sm ${props.disabled ? 'cursor-not-allowed text-gray-400' : 'cursor-pointer text-gray-900'}`}
        >
          {label}
        </span>
      </label>

      {error && (
        <p className="flex items-center text-xs font-medium text-red-500">
          <WarningOutlined className="mr-1" />
          {error}
        </p>
      )}
    </div>
  );
}
