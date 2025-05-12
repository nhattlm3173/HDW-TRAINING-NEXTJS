'use client';

import { useState } from 'react';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import { ConfirmModal } from '@/component/ConfirmModal';
import { cn } from '@/utils/cn';

export interface TodoValue {
  id: string;
  message: string;
  isFinish: boolean;
}

export interface Props {
  todoItem: TodoValue;
  handleDeleteTodoItemAction: (id: string, message: string) => void;
  handleChangeStatusTodoItemAction: (id: string) => void;
  askUpdateAction: (todo: TodoValue) => void;
}

export const TodoItem = ({
  todoItem,
  handleDeleteTodoItemAction,
  handleChangeStatusTodoItemAction,
  askUpdateAction,
}: Props) => {
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState<TodoValue | null>(null);

  const askDelete = (todo: TodoValue) => {
    setTodoToDelete(todo);

    setConfirmVisible(true);
  };

  const confirmDelete = () => {
    if (todoToDelete) {
      handleDeleteTodoItemAction(todoToDelete.id, todoToDelete.message);
    }

    setConfirmVisible(false);

    setTodoToDelete(null);
  };

  return (
    <div className="group flex items-center justify-between p-4 transition-all duration-200 hover:bg-gray-50">
      <div className="flex flex-1 items-center">
        <div className="relative">
          <input
            type="checkbox"
            checked={todoItem.isFinish}
            onChange={() => handleChangeStatusTodoItemAction(todoItem.id)}
            className="h-5 w-5 cursor-pointer rounded-md border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
        </div>
        <h2 className={cn('ml-3 text-gray-800', todoItem.isFinish && 'text-gray-400 line-through')}>
          {todoItem.message}
        </h2>
      </div>

      <button
        onClick={() => askUpdateAction(todoItem)}
        className="ml-2 rounded-full p-1 text-gray-400 opacity-0 transition-colors duration-200 group-hover:opacity-100 hover:bg-red-100 hover:text-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
      >
        <EditOutlined className="flex h-5 w-5 justify-center rounded-b-full text-xs" />
      </button>

      <button
        onClick={() => askDelete(todoItem)}
        className="ml-2 rounded-full p-1 text-gray-400 opacity-0 transition-colors duration-200 group-hover:opacity-100 hover:bg-red-100 hover:text-red-500 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
      >
        <CloseOutlined className="flex h-5 w-5 justify-center rounded-b-full text-xs" />
      </button>

      <ConfirmModal
        visible={confirmVisible}
        title={`Delete "${todoToDelete?.message}"?`}
        onConfirm={confirmDelete}
        onCancel={() => setConfirmVisible(false)}
        message="Are you sure you want to delete this task?"
      />
    </div>
  );
};
