"use client";
import { ToastItemProps, ToastType } from "@/type/toast/IToast";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
const getToastStyles = (type: ToastType) => {
  switch (type) {
    case "success":
      return "bg-gradient-to-r from-green-500 to-green-600 border-l-4 border-green-700";
    case "error":
      return "bg-gradient-to-r from-red-500 to-red-600 border-l-4 border-red-700";
    case "info":
      return "bg-gradient-to-r from-blue-500 to-blue-600 border-l-4 border-blue-700";
    case "warning":
      return "bg-gradient-to-r from-yellow-500 to-yellow-600 border-l-4 border-yellow-700";
    default:
      return "bg-gradient-to-r from-gray-700 to-gray-800 border-l-4 border-gray-900";
  }
};
const getIcon = (type: ToastType) => {
  switch (type) {
    case "success":
      return <CheckCircleOutlined />;
    case "error":
      return <CloseCircleOutlined />;
    case "info":
      return <InfoCircleOutlined />;
    case "warning":
      return <WarningOutlined />;
    default:
      return null;
  }
};
export const ToastItem = ({ toast, removeToast }: ToastItemProps) => {
  const duration = toast.duration || 3000;
  const [progress, setProgress] = useState(100);
  const intervalRef = useRef<NodeJS.Timeout>(null);
  const timeoutRef = useRef<NodeJS.Timeout>(null);
  //   console.log(intervalRef, timeoutRef);
  // console.log(progress, toast.id, intervalRef.current, timeoutRef.current);
  useEffect(() => {
    const startTime = Date.now();

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const percent = Math.max(100 - (elapsed / duration) * 100, 0);
      setProgress(percent);
    }, 50);
    timeoutRef.current = setTimeout(() => {
      removeToast(toast.id);
    }, duration);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [duration, toast]);
  return (
    <div
      className={`${getToastStyles(toast.type)} flex max-w-md min-w-[300px] transform flex-wrap items-center justify-between rounded-lg px-4 py-3 text-white shadow-lg transition-all duration-500 ease-in-out hover:translate-x-1 hover:shadow-xl`}
    >
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0">{getIcon(toast.type)}</div>
        <p className="text-sm font-medium">{toast.message}</p>
      </div>
      <button
        onClick={() => {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
          }
          removeToast(toast.id);
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
