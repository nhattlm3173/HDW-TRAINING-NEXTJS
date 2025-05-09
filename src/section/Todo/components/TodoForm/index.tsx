'use client';

import { memo, useEffect } from 'react';
import { TodoFormProps, TodoFormValues, TodoValue } from '@/section/Todo/types/ITodoList';
import { useForm } from 'react-hook-form';

export const ToDoForm = memo(function TodoForm({
  todoSelectedValue,
  onSubmit,
  todoToUpdate,
  setTodoToUpdate,
}: TodoFormProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm<TodoFormValues>();

  useEffect(() => {
    setValue('message', todoSelectedValue);
  }, [todoSelectedValue, setValue]);

  const submitHandler = (data: TodoFormValues) => {
    if (todoToUpdate) {
      onSubmit({
        ...todoToUpdate,
        message: data.message,
      });
    } else {
      const todoData: TodoValue = {
        id: Date.now().toString(),
        message: data.message,
        isFinish: false,
      };

      onSubmit(todoData);
    }

    reset();

    setTodoToUpdate(null);
  };

  return (
    <div className="flex items-center border-b border-gray-200 bg-white p-6">
      <form onSubmit={handleSubmit(submitHandler)} className="flex grow items-center">
        <div className="relative flex-1">
          <input
            {...register('message', { required: true })}
            aria-invalid={errors.message ? 'true' : 'false'}
            placeholder="Add a new task..."
            className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />

          {errors.message?.type === 'required' && (
            <p role="alert" className="absolute mt-1 text-sm text-red-500">
              Task description is required
            </p>
          )}
        </div>

        <button
          type="submit"
          className="ml-3 rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white transition-all duration-200 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
        >
          {todoToUpdate ? 'Update' : 'Add'}
        </button>
      </form>

      {todoToUpdate && (
        <button
          onClick={() => {
            setTodoToUpdate(null);
            reset();
          }}
          className="ml-3 rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white transition-all duration-200 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
        >
          {'Cancel'}
        </button>
      )}
    </div>
  );
});
