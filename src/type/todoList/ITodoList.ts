export interface TodoValue {
  id: string;
  message: string;
  isFinish: boolean;
}

export interface TodoListContainerProps {
  todoList: TodoValue[];
  setTodoList: React.Dispatch<React.SetStateAction<TodoValue[]>>;
}

export interface TodoFormValues {
  message: string;
}

export interface TodoItemProps {
  todoItem: TodoValue;
  handleDeleteTodoItem: (id: string, message: string) => void;
  handleChangeStatusTodoItem: (id: string) => void;
}
