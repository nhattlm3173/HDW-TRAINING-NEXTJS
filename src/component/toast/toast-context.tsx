"use client";
import { Toast, ToastContextType, ToastType } from "@/type/toast/IToast";
import React, { createContext, useContext, useState, ReactNode } from "react";
const ToastContext = createContext<ToastContextType | undefined>(undefined);
export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: ToastType, duration: number = 3000) => {
    const id = Date.now().toString();
    setToasts([...toasts, { id, message, type, duration }]);
    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
