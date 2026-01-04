import React from "react";

interface Todo {
  _id: string;
  description: string;
  date: string;
  completed: boolean;
}

interface ToDoCardProps {
  todo: Todo;
  onDelete: (id: string) => void;
}

const ToDoCard = ({ todo, onDelete }: ToDoCardProps) => {
  return (
    <div className="flex flex-col justify-between rounded-lg border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-4">
        <p className="text-lg font-medium text-slate-900">{todo.description}</p>
        <p className="text-sm text-slate-500">Due: {todo.date}</p>
      </div>
      <button
        onClick={() => onDelete(todo._id)}
        className="self-end rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
      >
        Delete
      </button>
    </div>
  );
};

export default ToDoCard;