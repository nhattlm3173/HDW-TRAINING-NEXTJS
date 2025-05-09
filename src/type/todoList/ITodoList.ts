import { Dispatch, SetStateAction } from 'react';

export interface TodoValue {
  id: string;
  message: string;
  isFinish: boolean;
}

export interface TodoListContainerProps {
  externalTodoList: TodoValue[];
}

export interface TodoFormValues {
  message: string;
}

export interface TodoItemProps {
  todoItem: TodoValue;
  handleDeleteTodoItem: (id: string, message: string) => void;
  handleChangeStatusTodoItem: (id: string) => void;
  askUpdate: (todo: TodoValue) => void;
}

export interface TodoFormProps {
  onSubmit: (data: TodoValue) => void;
  todoSelectedValue: string;
  todoToUpdate: TodoValue | null;
  setTodoToUpdate: Dispatch<SetStateAction<TodoValue | null>>;
}
