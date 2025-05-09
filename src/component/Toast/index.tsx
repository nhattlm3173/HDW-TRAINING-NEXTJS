'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import {
  Toast,
  ToastContainerProps,
  ToastContextType,
  ToastItemProps,
  ToastType,
} from '@/component/Toast/types/IToast';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import { cn } from '@/utils/cn';

const ToastContext = createContext<ToastContextType>({
  showToast: message => console.log('showToast not implemented', message),
});

const getToastStyles = (type: ToastType) => {
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

const ToastIcon = ({ type }: { type: ToastType }) => {
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

const ToastContainer = ({ toasts, removeToast }: ToastContainerProps) => {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col items-end space-y-3">
      {toasts.map((toast: Toast) => {
        return <ToastItem key={toast.id} toast={toast} removeToast={removeToast} />;
      })}
    </div>
  );
};

const ToastItem = ({ toast, removeToast }: ToastItemProps) => {
  const [progress, setProgress] = useState(100);
  const [isExiting, setIsExiting] = useState(false);

  const duration = toast.duration || 3000;

  useEffect(() => {
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const percent = Math.max(100 - (elapsed / duration) * 100, 0);

      if (percent <= 0) {
        clearInterval(interval);

        setIsExiting(true);
      }

      setProgress(percent);
    }, 50);

    return () => clearInterval(interval);
  }, [duration, toast]);

  return (
    <div
      className={cn(
        getToastStyles(toast.type),
        isExiting ? 'slide-out' : 'slide-in',
        'flex max-w-md min-w-[300px] transform flex-wrap items-center justify-between rounded-lg px-4 py-3',
        'text-white shadow-lg transition-all duration-500 ease-in-out hover:translate-x-1 hover:shadow-xl'
      )}
      onAnimationEnd={() => isExiting && removeToast(toast.id)}
    >
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0">
          <ToastIcon type={toast.type} />
        </div>
        <p className="text-sm font-medium">{toast.message}</p>
      </div>
      <button
        onClick={() => setIsExiting(true)}
        className="hover:bg-opacity-20 ml-4 cursor-pointer rounded-full p-1 transition-all duration-200 hover:scale-105 hover:opacity-70"
      >
        <CloseCircleOutlined />
      </button>
      <div className="bg-opacity-20 h-1 w-full rounded-b bg-black">
        <div
          className="bg-opacity-70 h-full bg-white transition-all duration-50 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
};
