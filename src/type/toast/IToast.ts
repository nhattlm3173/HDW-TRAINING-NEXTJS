export enum ToastType {
  SUCCESS = "success",
  ERROR = "error",
  INFO = "info",
  WARNING = "warning",
}
export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}
export interface ToastItemProps {
  toast: Toast;
  removeToast: (id: string) => void;
}
export interface ToastContextType {
  toasts: Toast[];
  showToast: (message: string, type: ToastType) => void;
  removeToast: (id: string) => void;
}
