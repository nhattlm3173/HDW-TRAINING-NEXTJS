'use client';

import { ToastType } from '../types/IToast';

export const getToastStyles = (type: ToastType) => {
  let classes = 'bg-gradient-to-r border-l-4 ';

  switch (type) {
    case 'success':
      classes += 'from-green-500 to-green-600 border-green-700';
      break;

    case 'error':
      classes += 'from-red-500 to-red-600 border-red-700';
      break;

    case 'info':
      classes += 'from-blue-500 to-blue-600 border-blue-700';
      break;

    case 'warning':
      classes += 'from-yellow-500 to-yellow-600 border-yellow-700';
      break;

    default:
      classes += 'from-gray-700 to-gray-800 border-gray-900';
      break;
  }

  return classes;
};
