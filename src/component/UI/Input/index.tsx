'use client';

import React from 'react';
import { InputProps } from './types/IInput';
import { WarningOutlined } from '@ant-design/icons';

export default function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="mx-1 my-3 flex w-full flex-col space-y-2">
      {label && (
        <label className="text-sm font-medium text-gray-700 transition-colors">{label}</label>
      )}

      <div
        className={`flex items-center rounded-md pl-3 outline-1 -outline-offset-1 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 ${
          error
            ? 'border border-red-300 bg-red-50 text-red-900 placeholder-red-300 has-[input:focus-within]:outline-red-600'
            : 'border border-gray-200 bg-white placeholder-gray-400 hover:border-gray-300 has-[input:focus-within]:outline-indigo-600'
        }`}
      >
        <input
          className={`block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 ${className}`}
          {...props}
        />
      </div>

      {error && (
        <p className="flex items-center text-xs font-medium text-red-500">
          <WarningOutlined className="pr-1" />
          {error}
        </p>
      )}
    </div>
  );
}
