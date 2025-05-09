'use client';

import { Toast, ToastContainerProps } from '../../types/IToast';
import { ToastItem } from '../ToastItem';

export const ToastContainer = ({ toasts, removeToast }: ToastContainerProps) => {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col items-end space-y-3">
      {toasts.map((toast: Toast) => {
        return <ToastItem key={toast.id} toast={toast} removeToast={removeToast} />;
      })}
    </div>
  );
};
