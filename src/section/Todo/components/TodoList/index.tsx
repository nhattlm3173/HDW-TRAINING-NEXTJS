'use client';

import { useState } from 'react';
import { useTodoOperations } from '../../hooks/useTodoOperations';
import { TodoValue } from '@/section/Todo/types/ITodoList';
import { ContainerOutlined } from '@ant-design/icons';
import { TodoItem } from '../TodoItem';
import { ToDoForm } from '../TodoForm';

interface Props {
  todoList: TodoValue[];
}

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
        {todoListData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500">
            <ContainerOutlined className="mb-4 text-7xl text-gray-300" />
            <p>No tasks yet. Add one above!</p>
          </div>
        ) : (
          todoListData.map((item: TodoValue) => (
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

      {todoListData.length > 0 && (
        <div className="flex justify-between bg-gray-50 p-4 text-sm text-gray-600">
          <span>Total: {todoListData.length} tasks</span>
          <span>Completed: {todoListData.filter(item => item.isFinish).length}</span>
        </div>
      )}
    </div>
  );
};
