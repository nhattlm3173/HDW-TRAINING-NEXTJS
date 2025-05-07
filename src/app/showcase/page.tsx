'use client';
import { useToast } from '@/component/Toast';
import { ToastType } from '@/type/toast/IToast';
import React from 'react';

export default function ShowCase() {
  const { showToast } = useToast();
  // const toasts = useContext(ToastContext);
  // console.log(toasts);

  return (
    <div className="space-y-3 space-x-3">
      <p>showcase</p>
      <button
        onClick={() => showToast('Test hiển thị toast success!', ToastType.SUCCESS)}
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Show Toast Success
      </button>
      <button
        onClick={() => showToast('Test hiển thị toast error!', ToastType.ERROR)}
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Show Toast Error
      </button>
      <button
        onClick={() => showToast('Test hiển thị toast info!', ToastType.INFO)}
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Show Toast Info
      </button>
      <button
        onClick={() => showToast('Test hiển thị toast warning!', ToastType.WARNING)}
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Show Toast Warning
      </button>
    </div>
  );
}
