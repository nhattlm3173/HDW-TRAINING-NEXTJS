'use client';

import { useState } from 'react';
import { TodoValue } from '@/section/Todo/types/ITodoList';
import { useToast } from '@/component/Toast/hooks/useToast';
import { ToastType } from '@/component/Toast/types/IToast';

export function useTodoOperations(initialTodos: TodoValue[] = []) {
  const [todoList, setTodoList] = useState<TodoValue[]>(initialTodos);
  const [todoToUpdate, setTodoToUpdate] = useState<TodoValue | null>(null);

  const { showToast } = useToast();

  const handleAddTodoItem = (todoItem: TodoValue) => {
    setTodoList((pre: TodoValue[]) => [...pre, todoItem]);

    showToast(`Task ${todoItem.message} added successfully!`, ToastType.SUCCESS);
  };

  const handleDeleteTodoItem = (id: string, message: string) => {
    setTodoList((pre: TodoValue[]) => pre.filter((item: TodoValue) => item.id !== id));

    showToast(`Task ${message} deleted successfully!`, ToastType.SUCCESS);
  };

  const handleChangeStatusTodoItem = (id: string) => {
    let message = '';

    setTodoList((pre: TodoValue[]) =>
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
    setTodoList((pre: TodoValue[]) =>
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
    todoList,
    todoToUpdate,
    setTodoToUpdate,
    handleAddTodoItem,
    handleDeleteTodoItem,
    handleChangeStatusTodoItem,
    handleUpdateTodoItem,
  };
}
