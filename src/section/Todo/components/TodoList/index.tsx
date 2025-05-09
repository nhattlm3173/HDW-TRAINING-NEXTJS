'use client';

import { useEffect, useMemo, useState } from 'react';
import { useTodoOperations } from '../../hooks/useTodoOperations';
import { TodoValue } from '@/section/Todo/types/ITodoList';
import { ContainerOutlined } from '@ant-design/icons';
import { TodoItem } from '../TodoItem';
import { ToDoForm } from '../TodoForm';

interface Props {
  todoList: TodoValue[];
}

const EmptyState = ({ todos }: { todos: TodoValue[] }) => {
  if (todos.length) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 text-gray-500">
      <ContainerOutlined className="mb-4 text-7xl text-gray-300" />
      <p>No tasks yet. Add one above!</p>
    </div>
  );
};

const Summary = ({ todos }: { todos: TodoValue[] }) => {
  const todoCompleted = useMemo(() => {
    return todos.filter(item => item.isFinish);
  }, [todos]);

  return (
    <div className="flex justify-between bg-gray-50 p-4 text-sm text-gray-600">
      <span>Total: {todos.length} tasks</span>
      <span>Completed: {todoCompleted.length}</span>
    </div>
  );
};

export const TodoList = ({ todoList }: Props) => {
  const {
    todoListData,
    todoToUpdate,
    setTodoToUpdate,
    handleAddTodoItem,
    handleDeleteTodoItem,
    handleChangeStatusTodoItem,
    handleUpdateTodoItem,
  } = useTodoOperations(todoList);

  const [todoSelectedValue, setTodoSelectedValue] = useState<string>('');

  const onSubmit = (data: TodoValue) => {
    if (todoToUpdate) {
      handleUpdateTodoItem(data.message);
    } else {
      handleAddTodoItem(data);
    }
  };

  useEffect(() => {
    console.log('PDebug TodoList render');
  });

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
        <EmptyState todos={todoListData} />

        {todoListData.length > 0 &&
          todoListData.map((item: TodoValue) => (
            <TodoItem
              key={item.id}
              todoItem={item}
              handleDeleteTodoItemAction={handleDeleteTodoItem}
              handleChangeStatusTodoItemAction={handleChangeStatusTodoItem}
              askUpdateAction={askUpdate}
            />
          ))}
      </div>

      <Summary todos={todoListData} />
    </div>
  );
};
