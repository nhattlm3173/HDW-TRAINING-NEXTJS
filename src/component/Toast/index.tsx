'use client';

import React, { createContext, useState, ReactNode } from 'react';
import { Toast, ToastContextType, ToastType } from '@/component/Toast/types/IToast';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import { ToastContainer } from './components/ToastContainer';

export const ToastContext = createContext<ToastContextType>({
  showToast: message => console.log('showToast not implemented', message),
});

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

export const ToastIcon = ({ type }: { type: ToastType }) => {
  switch (type) {
    case 'success':
      return <CheckCircleOutlined />;

    case 'error':
      return <CloseCircleOutlined />;

    case 'info':
      return <InfoCircleOutlined />;

    case 'warning':
      return <WarningOutlined />;

    default:
      return null;
  }
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: ToastType, duration: number = 3000) => {
    const newToast: Toast = {
      id: Date.now().toString(),
      message,
      type,
      duration,
    };

    setToasts(prevState => [...prevState, newToast]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};
