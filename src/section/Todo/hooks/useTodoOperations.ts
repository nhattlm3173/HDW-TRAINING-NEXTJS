'use client';

import { useState } from 'react';
import { useToast } from '@/component/Toast/hooks/useToast';
import { ToastType } from '@/component/Toast/types/IToast';
import { TodoValue } from '@/section/Todo/components/TodoItem';

export function useTodoOperations(initialTodos: TodoValue[] = []) {
  const [todoListData, setTodoListData] = useState<TodoValue[]>(initialTodos);
  const [todoToUpdate, setTodoToUpdate] = useState<TodoValue | null>(null);

  const { showToast } = useToast();

  const handleAddTodoItem = (todoItem: TodoValue) => {
    setTodoListData((pre: TodoValue[]) => [...pre, todoItem]);

    showToast(`Task ${todoItem.message} added successfully!`, ToastType.SUCCESS);
  };

  const handleDeleteTodoItem = (id: string, message: string) => {
    setTodoListData((pre: TodoValue[]) => pre.filter((item: TodoValue) => item.id !== id));

    showToast(`Task ${message} deleted successfully!`, ToastType.SUCCESS);
  };

  const handleChangeStatusTodoItem = (id: string) => {
    let message = '';

    setTodoListData((pre: TodoValue[]) =>
      pre.map((item: TodoValue) => {
        if (item.id === id) {
          message = item.message;

          return { ...item, isFinish: !item.isFinish };
        }

        return item;
      })
    );

    showToast(`Task ${message} updated status successfully!`, ToastType.SUCCESS);
  };

  const handleUpdateTodoItem = (message: string) => {
    setTodoListData((pre: TodoValue[]) =>
      pre.map((item: TodoValue) => {
        if (item.id === todoToUpdate?.id) {
          return { ...item, message };
        }

        return item;
      })
    );

    showToast(`Task ${message} updated successfully!`, ToastType.SUCCESS);
  };

  return {
    todoListData,
    todoToUpdate,
    setTodoToUpdate,
    handleAddTodoItem,
    handleDeleteTodoItem,
    handleChangeStatusTodoItem,
    handleUpdateTodoItem,
  };
}
