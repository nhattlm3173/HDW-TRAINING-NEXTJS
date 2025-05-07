'use client';
import {
  Toast,
  ToastContainerProps,
  ToastContextType,
  ToastItemProps,
  ToastType,
} from '@/type/toast/IToast';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const getToastStyles = (type: ToastType) => {
  switch (type) {
    case 'success':
      return 'bg-gradient-to-r from-green-500 to-green-600 border-l-4 border-green-700';
    case 'error':
      return 'bg-gradient-to-r from-red-500 to-red-600 border-l-4 border-red-700';
    case 'info':
      return 'bg-gradient-to-r from-blue-500 to-blue-600 border-l-4 border-blue-700';
    case 'warning':
      return 'bg-gradient-to-r from-yellow-500 to-yellow-600 border-l-4 border-yellow-700';
    default:
      return 'bg-gradient-to-r from-gray-700 to-gray-800 border-l-4 border-gray-900';
  }
};

const getIcon = (type: ToastType) => {
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

  // console.log(toasts);

  const showToast = (message: string, type: ToastType, duration: number = 3000) => {
    const id = Date.now().toString();

    setToasts([...toasts, { id, message, type, duration }]);

    // setTimeout(() => {
    //   removeToast(id);
    // }, duration);
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
  //   console.log(toasts);

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col items-end space-y-3">
      {toasts.map((toast: Toast) => {
        return <ToastItem key={toast.id} toast={toast} removeToast={removeToast} />;
      })}
    </div>
  );
};

const ToastItem = ({ toast, removeToast }: ToastItemProps) => {
  const duration = toast.duration || 3000;

  const [progress, setProgress] = useState(100);

  // const intervalRef = useRef<NodeJS.Timeout>(null);

  const [isExiting, setIsExiting] = useState(false);

  // const timeoutRef = useRef<NodeJS.Timeout>(null);
  //   console.log(intervalRef, timeoutRef);
  // console.log(progress, toast.id, intervalRef.current, timeoutRef.current);

  useEffect(() => {
    const startTime = Date.now();

    // intervalRef.current = setInterval(() => {
    //   const elapsed = Date.now() - startTime;

    //   const percent = Math.max(100 - (elapsed / duration) * 100, 0);

    //   setProgress(percent);
    // }, 50);

    // timeoutRef.current = setTimeout(() => {
    //   setIsExiting(true);
    //   // removeToast(toast.id);
    // }, duration);

    // return () => {
    //   if (intervalRef.current) {
    //     clearInterval(intervalRef.current);

    //     intervalRef.current = null;
    //   }

    //   if (timeoutRef.current) {
    //     clearTimeout(timeoutRef.current);

    //     timeoutRef.current = null;
    //   }
    // };

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
      className={`${getToastStyles(toast.type)} ${
        isExiting ? 'slide-out' : 'slide-in'
      } flex max-w-md min-w-[300px] transform flex-wrap items-center justify-between rounded-lg px-4 py-3 text-white shadow-lg transition-all duration-500 ease-in-out hover:translate-x-1 hover:shadow-xl`}
      onAnimationEnd={() => {
        console.log('end');

        if (isExiting) {
          removeToast(toast.id);
        }
      }}
    >
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0">{getIcon(toast.type)}</div>
        <p className="text-sm font-medium">{toast.message}</p>
      </div>
      <button
        onClick={() => {
          setIsExiting(true);

          // if (intervalRef.current) {
          //   clearInterval(intervalRef.current);

          //   intervalRef.current = null;
          // }

          // if (timeoutRef.current) {
          //   clearTimeout(timeoutRef.current);

          //   timeoutRef.current = null;
          // }

          // removeToast(toast.id);
        }}
        className="hover:bg-opacity-20 ml-4 cursor-pointer rounded-full p-1 transition-all duration-200 hover:scale-105 hover:opacity-70"
      >
        <CloseCircleOutlined />
      </button>
      <div className="bg-opacity-20 h-1 w-full rounded-b bg-black">
        <div
          className="bg-opacity-70 h-full bg-white transition-all duration-50 ease-linear"
          style={{ width: `${progress}%` }}
        ></div>
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
