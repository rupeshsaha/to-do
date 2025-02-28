"use client";
import React, { useContext, useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import { useTasks } from "@/store/TaskContext";
import { Loader2, Plus, PlusCircle } from "lucide-react";
import ConfigureTaskModal from "./ConfigureTaskModal";

const TasksContainer = () => {
  const [categories] = useState(["All", "Work", "Study", "Personal"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [creating, setIsCreating] = useState(false)

const {fetchTasks, tasks} = useTasks()

  useEffect(() => {
    try {
      fetchTasks()
      setLoading(true)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
    
  }, []);

  const filteredTasks =
    selectedCategory === "All"
      ? tasks
      : tasks.filter((task) => task.category === selectedCategory.toLowerCase());

  return (
    <div className=" min-h-[80vh] flex flex-col justify-start items-center p-4 gap-4">
      <div className="flex md:justify-between justify-center items-center w-full py-2 px-3   gap-4">
        <div className="flex gap-4">
          {categories.map((category, idx) => (
            <div
              className={`flex gap-2 ${
                category === "All" ? "border-r-blue-500 border-r px-2" : ""
              }`}
              key={idx}
            >
              <button
                key={idx}
                onClick={() => setSelectedCategory(category)}
                className={`flex cursor-pointer justify-center items-center duration-200  font-semibold transition  ${
                  selectedCategory === category
                    ? "text-blue-500"
                    : "text-gray-400 hover:text-blue-500"
                } `}
              >
                {category}
              </button>
              <div
                className={`p-3 flex justify-center items-center w-2 h-2 rounded-full text-white ${
                  selectedCategory === category
                    ? "bg-blue-500 "
                    : " bg-gray-400 hover:bg-blue-500"
                }`}
              >
                {filteredTasks.length}
              </div>
            </div>
          ))}
        </div>
        <button onClick={()=>setIsCreating(true)} className=" bg-blue-500 text-white px-3 py-2 rounded-lg cursor-pointer hidden md:flex">
          <Plus /> Add new task
        </button>
        <ConfigureTaskModal
          isOpen={creating}
          onClose={() => setIsCreating(false)}
          mode="Create"
        />
      </div>

      {loading && <Loader2 className="animate-spin" />}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && filteredTasks.length === 0 && (
        <p className="text-gray-500">No tasks found.</p>
      )}
      {filteredTasks.map((task) => (
        <TaskCard key={task._id} data={task} />
      ))}
    </div>
  );
};

export default TasksContainer;
