"use client";

import { useEffect, useState } from "react";
import CreateToDo from "./CreateToDO";
import ToDoCard from "./ToDoCard";

interface Todo {
  _id: string;
  description: string;
  date: string;
  completed: boolean;
}

const AllToDOs = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTodos = async () => {
    try {
      const response = await fetch("http://localhost:3001/todos");
      if (response.ok) {
        const data = await response.json();
        setTodos(data);
      } else {
        console.error("Failed to fetch todos");
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3001/todos/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setTodos((prev) => prev.filter((todo) => todo._id !== id));
      } else {
        alert("Failed to delete todo");
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
      alert("Error deleting todo");
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <CreateToDo onTodoAdded={fetchTodos} />
      
      <div className="mt-12">
        <h2 className="mb-6 text-2xl font-bold text-slate-900">Your Tasks</h2>
        {isLoading ? (
          <p className="text-center text-slate-500">Loading tasks...</p>
        ) : todos.length === 0 ? (
          <p className="text-center text-slate-500">No tasks found. Create one above!</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {todos.map((todo) => (
              <ToDoCard key={todo._id} todo={todo} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllToDOs;