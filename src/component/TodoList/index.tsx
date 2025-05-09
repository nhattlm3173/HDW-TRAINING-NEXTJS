'use client';
import { useForm } from 'react-hook-form';
import {
  TodoValue,
  TodoListContainerProps,
  TodoFormValues,
  TodoItemProps,
  TodoFormProps,
} from '@/type/todoList/ITodoList';
import { memo, useEffect, useState } from 'react';
import { CloseOutlined, ContainerOutlined, EditOutlined } from '@ant-design/icons';
import { useToast } from '../Toast';
import { ToastType } from '@/type/toast/IToast';
import { ConfirmModal } from '../ConfirmModal';
import { cn } from '@/utils/cn';

export const TodoListContainer = memo(function TodoListContainer({
  externalTodoList,
}: TodoListContainerProps) {
  const {
    todoList,
    todoToUpdate,
    setTodoToUpdate,
    handleAddTodoItem,
    handleDeleteTodoItem,
    handleChangeStatusTodoItem,
    handleUpdateTodoItem,
  } = useTodoOperations(externalTodoList);

  const [todoSelectedValue, setTodoSelectedValue] = useState<string>('');

  const onSubmit = (data: TodoValue) => {
    if (todoToUpdate) {
      handleUpdateTodoItem(data.message);
    } else {
      handleAddTodoItem(data);
    }
  };

  // console.log(todoList);

  const askUpdate = (todo: TodoValue) => {
    setTodoToUpdate(todo);

    setTodoSelectedValue(todo.message);
  };

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-xl">
      <ToDoForm
        onSubmit={onSubmit}
        todoSelectedValue={todoSelectedValue}
        todoToUpdate={todoToUpdate}
        setTodoToUpdate={setTodoToUpdate}
      />

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
              askUpdate={askUpdate}
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

const ToDoForm = memo(function TodoForm({
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

const TodoItem = memo(function TodoListContainer({
  todoItem,
  handleDeleteTodoItem,
  handleChangeStatusTodoItem,
  askUpdate,
}: TodoItemProps) {
  //   console.log(todoItem.message);

  const [confirmVisible, setConfirmVisible] = useState(false);

  const [todoToDelete, setTodoToDelete] = useState<TodoValue | null>(null);

  const askDelete = (todo: TodoValue) => {
    setTodoToDelete(todo);

    setConfirmVisible(true);
  };

  const confirmDelete = () => {
    if (todoToDelete) {
      handleDeleteTodoItem(todoToDelete.id, todoToDelete.message);
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
            onChange={() => handleChangeStatusTodoItem(todoItem.id)}
            className="h-5 w-5 cursor-pointer rounded-md border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
        </div>
        <h2 className={cn('ml-3 text-gray-800', todoItem.isFinish && 'text-gray-400 line-through')}>
          {todoItem.message}
        </h2>
      </div>

      <button
        onClick={() => askUpdate(todoItem)}
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
});

function useTodoOperations(initialTodos: TodoValue[] = []) {
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
