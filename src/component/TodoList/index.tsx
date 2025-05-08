'use client';
import { useForm } from 'react-hook-form';
import {
  TodoValue,
  TodoListContainerProps,
  TodoFormValues,
  TodoItemProps,
} from '@/type/todoList/ITodoList';
import { memo } from 'react';
import { CloseOutlined, ContainerOutlined } from '@ant-design/icons';

export const TodoListContainer = memo(function TodoListContainer({
  todoList,
  setTodoList,
}: TodoListContainerProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<TodoFormValues>();

  const onSubmit = (data: TodoFormValues) => {
    const todoData: TodoValue = {
      id: Date.now().toString(),
      message: data.message,
      isFinish: false,
    };

    handleAddTodoItem(todoData);

    reset();
  };

  //   console.log(todoList);

  const handleAddTodoItem = (todoItem: TodoValue) => {
    setTodoList((pre: TodoValue[]) => [...pre, todoItem]);
  };

  const handleDeleteTodoItem = (id: string) => {
    setTodoList((pre: TodoValue[]) => pre.filter((item: TodoValue) => item.id !== id));
  };

  const handleChangeStatusTodoItem = (id: string) => {
    setTodoList((pre: TodoValue[]) =>
      pre.map((item: TodoValue) => {
        if (item.id === id) {
          return { ...item, isFinish: !item.isFinish };
        }

        return item;
      })
    );
  };

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-xl">
      <div className="border-b border-gray-200 bg-white p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="flex items-center">
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
            Add
          </button>
        </form>
      </div>

      <div className="divide-y divide-gray-100">
        {todoList.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500">
            <ContainerOutlined className="mb-4 text-7xl text-gray-300" />
            <p>No tasks yet. Add one above!</p>
          </div>
        ) : (
          todoList.map((item: TodoValue) => (
            <TodoItem
              key={item.id}
              todoItem={item}
              handleDeleteTodoItem={handleDeleteTodoItem}
              handleChangeStatusTodoItem={handleChangeStatusTodoItem}
            />
          ))
        )}
      </div>

      {todoList.length > 0 && (
        <div className="flex justify-between bg-gray-50 p-4 text-sm text-gray-600">
          <span>Total: {todoList.length} tasks</span>
          <span>Completed: {todoList.filter(item => item.isFinish).length}</span>
        </div>
      )}
    </div>
  );
});

const TodoItem = memo(function TodoListContainer({
  todoItem,
  handleDeleteTodoItem,
  handleChangeStatusTodoItem,
}: TodoItemProps) {
  //   console.log(todoItem.message);

  return (
    <div className="group flex items-center justify-between p-4 transition-all duration-200 hover:bg-gray-50">
      <div className="flex flex-1 items-center">
        <div className="relative">
          <input
            type="checkbox"
            checked={todoItem.isFinish}
            onChange={() => handleChangeStatusTodoItem(todoItem.id)}
            className="h-5 w-5 cursor-pointer rounded-md border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
        </div>
        <h2
          className={`ml-3 text-gray-800 ${todoItem.isFinish ? 'text-gray-400 line-through' : ''}`}
        >
          {todoItem.message}
        </h2>
      </div>

      <button
        onClick={() => handleDeleteTodoItem(todoItem.id)}
        className="ml-2 rounded-full p-1 text-gray-400 opacity-0 transition-colors duration-200 group-hover:opacity-100 hover:bg-red-100 hover:text-red-500 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
      >
        <CloseOutlined className="flex h-5 w-5 justify-center rounded-b-full text-xs" />
      </button>
    </div>
  );
});
