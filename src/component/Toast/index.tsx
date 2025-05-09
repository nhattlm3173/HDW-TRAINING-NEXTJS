'use client';

import React, { createContext, useState, ReactNode } from 'react';
import { Toast, ToastContextType, ToastType } from '@/component/Toast/types/IToast';
import { ToastContainer } from './components/ToastContainer';

export const ToastContext = createContext<ToastContextType>({
  showToast: message => console.log('showToast not implemented', message),
});

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
