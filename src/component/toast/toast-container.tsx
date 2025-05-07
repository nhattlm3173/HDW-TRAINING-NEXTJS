"use client";
import { Toast } from "@/type/toast/IToast";
import { useToast } from "./toast-context";
import { ToastItem } from "./toast-item";

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();
  //   console.log(toasts);
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col items-end space-y-3">
      {toasts.map((toast: Toast) => {
        return <ToastItem key={toast.id} toast={toast} removeToast={removeToast} />;
      })}
    </div>
  );
}
