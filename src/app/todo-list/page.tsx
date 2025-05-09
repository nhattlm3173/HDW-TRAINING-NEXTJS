'use client';
import { TodoListContainer } from '@/component/TodoList';
import { TodoValue } from '@/type/todoList/ITodoList';
import React from 'react';

export default function TodoList() {
  // const [todoList, setTodoList] = useState<TodoValue[]>([]);
  const mockTodoList: TodoValue[] = [
    { id: (Date.now() + 1).toString(), message: 'Learn ReactJS', isFinish: false },
    { id: (Date.now() + 2).toString(), message: 'Learn NextJS', isFinish: false },
    { id: (Date.now() + 3).toString(), message: 'Implement Todo List', isFinish: true },
  ];
  //   const [test, setTest] = useState(false);

  return (
    <div className="flex min-h-screen justify-center bg-gradient-to-br from-indigo-100 to-purple-100 p-6">
      <div className="w-full max-w-2xl">
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-800">My Tasks</h1>
        <TodoListContainer externalTodoList={mockTodoList} />
      </div>
    </div>
  );
}
