'use client';

import { ConfirmModalProps } from '../../type/confirm/IConfirm';

export const ConfirmModal = ({
  visible,
  title,
  onConfirm,
  onCancel,
  message = '',
}: ConfirmModalProps) => {
  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ease-in-out ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-modal="true"
      role="dialog"
    >
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out ${
          visible ? 'opacity-50' : 'opacity-0'
        }`}
        onClick={onCancel}
      />

      <div
        className={`mx-4 w-full max-w-md transform rounded-lg bg-white shadow-xl transition-all duration-300 ease-in-out ${
          visible ? 'translate-y-0 scale-100' : 'translate-y-4 scale-95'
        } relative`}
      >
        <div className="border-b border-gray-200 px-6 py-4">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        </div>

        {message && (
          <div className="px-6 py-4">
            <p className="text-sm text-gray-600">{message}</p>
          </div>
        )}

        <div className="flex justify-end space-x-3 rounded-b-lg bg-gray-50 px-6 py-4">
          <button
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
            onClick={onCancel}
          >
            No
          </button>
          <button
            className="rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
            onClick={onConfirm}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};
