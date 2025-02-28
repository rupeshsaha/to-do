"use client"

import { createContext, useContext, useState} from "react";

const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);


  const fetchTasks = async () => {
    try {
      const res = await fetch("/api/task");
      if (!res.ok) throw new Error("Failed to fetch tasks");
      const data = await res.json();
      setTasks(data.allTasks);
    } catch (err) {
      console.error("Error fetching tasks:", err.message);
    }
  };

  const deleteTask = async (id) => {
    try {
        const res = await fetch(`/api/task`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        });
      if (!res.ok) throw new Error("Failed to delete task");

        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
        alert('Task deleted successfully')
        await fetchTasks()
    } catch (err) {
        console.error("Error deleting task:", err.message);
        alert("Error while deleting task")
    }
  };

  const updateTask = async (updatedData) => {
    try {
      const res = await fetch(`/api/task`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) alert("Failed to update task");

      alert(`Task updated successfully`)
        await fetchTasks()
    } catch (err) {
      console.error("Error updating task:", err.message);
    }
    
  };

  const createTask = async (taskData) => {
    try {
      const res = await fetch(`/api/task`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      });

      if (!res.ok) alert("Failed to create task");
      if (res.ok) {
        alert("Task created successfully")
      }

        await fetchTasks()
    } catch (err) {
      console.error("Error creating task:", err.message);
    }
    
  };
  


  return (
    <TasksContext.Provider
      value={{ tasks, setTasks,createTask, fetchTasks, deleteTask, updateTask }}
    >
      {children}
    </TasksContext.Provider>
  );
};

// Custom hook to use the tasks context
export const useTasks = () => useContext(TasksContext);
