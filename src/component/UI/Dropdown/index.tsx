'use client';

import React from 'react';
import { WarningOutlined } from '@ant-design/icons';
import { DropdownProps } from './types/IDropdown';

export default function Dropdown({
  name,
  label,
  placeholder = 'Chọn giá trị...',
  options,
  value,
  onChange,
  error,
  disabled = false,
}: DropdownProps) {
  return (
    <div className="mx-1 my-3 flex w-fit flex-col space-y-1">
      {label && <label className="text-sm font-medium text-gray-900">{label}</label>}

      <select
        name={name}
        value={value}
        disabled={disabled}
        onChange={e => {
          if (onChange) onChange(e.target.value);
        }}
        className={`block w-full rounded-md border bg-white px-3 py-2 text-sm text-gray-900 shadow-sm ${error ? 'border-red-500' : 'border-gray-300'} ${disabled ? 'cursor-not-allowed bg-gray-100 text-gray-400' : 'hover:border-gray-400'} `}
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value} disabled={opt.disabled}>
            {opt.label}
          </option>
        ))}
      </select>

      {error && (
        <p className="flex items-center text-xs font-medium text-red-500">
          <WarningOutlined className="mr-1" />
          {error}
        </p>
      )}
    </div>
  );
}
