'use client';

import { useEffect, useState } from 'react';
import { ToastItemProps } from '../../types/IToast';
import { CloseCircleOutlined } from '@ant-design/icons';
import { cn } from '@/utils/cn';
import { ToastIcon } from '../../utils/getToastIcon';
import { getToastStyles } from '../../utils/getToastStyles';

export const ToastItem = ({ toast, removeToast }: ToastItemProps) => {
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
