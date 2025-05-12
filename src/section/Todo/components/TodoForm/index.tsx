'use client';

import { Dispatch, SetStateAction, useEffect } from 'react';
import { TodoFormValues } from '@/section/Todo/types/ITodoList';
import { useForm } from 'react-hook-form';
import { TodoValue } from '@/section/Todo/components/TodoItem';

export interface Props {
  onSubmitAction: (data: TodoValue) => void;
  todoSelectedValue: string;
  todoToUpdate: TodoValue | null;
  setTodoToUpdateAction: Dispatch<SetStateAction<TodoValue | null>>;
}

export const ToDoForm = ({
  todoSelectedValue,
  onSubmitAction,
  todoToUpdate,
  setTodoToUpdateAction,
}: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm<TodoFormValues>();

  useEffect(() => {
    console.log('PDebug TodoForm render');
  });

  useEffect(() => {
    setValue('message', todoSelectedValue);
  }, [todoSelectedValue, setValue]);

  const submitHandler = (data: TodoFormValues) => {
    if (todoToUpdate) {
      onSubmitAction({
        ...todoToUpdate,
        message: data.message,
      });
    } else {
      const todoData: TodoValue = {
        id: Date.now().toString(),
        message: data.message,
        isFinish: false,
      };

      onSubmitAction(todoData);
    }

    reset();

    setTodoToUpdateAction(null);
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
            setTodoToUpdateAction(null);
            reset();
          }}
          className="ml-3 rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white transition-all duration-200 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
        >
          {'Cancel'}
        </button>
      )}
    </div>
  );
};
