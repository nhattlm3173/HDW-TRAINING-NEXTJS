'use client';

import React, { createContext, useState, ReactNode, useCallback, useMemo } from 'react';
import { Toast, ToastContextType, ToastType } from '@/component/Toast/types/IToast';
import { ToastContainer } from './components/ToastContainer';

// Create a context for managing toast notifications
export const ToastContext = createContext<ToastContextType>({
  showToast: message => console.log('showToast not implemented', message),
});

// ToastProvider component to manage toast state and provide context
export const ToastProvider = ({ children }: { children: ReactNode }) => {
  // State to hold the list of toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Function to show a new toast
  const showToast = useCallback((message: string, type: ToastType, duration: number = 3000) => {
    const newToast: Toast = {
      id: Date.now().toString(), // Unique ID for the toast
      message,
      type,
      duration,
    };

    console.log('PDebug add toast: ', newToast);

    // Add the new toast to the state
    setToasts(prevState => [...prevState, newToast]);
  }, []);

  // Function to remove a toast by its ID
  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
    console.log('PDebug remove toast by id: ', id);
  }, []);

  // Memoized context value to avoid unnecessary re-renders
  const toastContextValue = useMemo(() => ({ showToast }), [showToast]);

  return (
    // Provide the context value to child components
    <ToastContext.Provider value={toastContextValue}>
      {children}
      {/* Render the ToastContainer to display toasts */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};
