'use client';

import React from 'react';
import { ButtonProps } from './types/IButton';
import { cn } from '@/utils/cn';

export default function Button({ label, className = '', ...props }: ButtonProps) {
  const baseStyle =
    'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-all bg-indigo-600 text-white  mx-1 my-3 ';
  const disabledStyle = 'bg-gray-200 text-gray-500 cursor-not-allowed transform-none';

  const combinedClass = cn(
    baseStyle,
    props.disabled
      ? disabledStyle
      : 'cursor-pointer hover:bg-indigo-700 hover:scale-105 active:scale-95 active:opacity-95',
    className
  );

  return (
    <button type="submit" className={combinedClass} {...props}>
      {label}
    </button>
  );
}
