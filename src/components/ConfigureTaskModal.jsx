"use client";

import { useTasks } from "@/store/TaskContext";
import { formatMongoTime } from "@/utils/formatMongoTimestamp";
import React, { useEffect, useState } from "react";

const ConfigureTaskModal = ({ isOpen, onClose, mode, data }) => {
  if (!isOpen) return null;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [timestamp, setTimestamp] = useState(new Date().toISOString().slice(0, 16));
  const [selectedCategory, setSelectedCategory] = useState("personal");
  const { updateTask, createTask } = useTasks();

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setDescription(data.description);
      setTimestamp(formatMongoTime(data.timestamp));
      setSelectedCategory(data.category);
    }
  }, []);

  const handleCategoryChange = (e, category) => {
    e.preventDefault();
    setSelectedCategory(category);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (mode === "Create") {
      try {
        createTask({
          title,
          description,
          timestamp,
          category: selectedCategory,
        });
      } catch (error) {
        alert(`Error while updating task`);
      } finally {
        onClose();
      }
    } else {
      try {
        updateTask({
          title,
          description,
          timestamp: data.timestamp,
          category: selectedCategory,
          id: data._id,
        });
      } catch (error) {
        alert(`Error while updating task`);
      } finally {
        onClose();
      }
    }
  };

  return (
    <div className="fixed inset-0 flex  items-center justify-center bg-[#00000080] backdrop-blur-sm z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-6">{mode} Task</h2>
        <form>
          <div className="mb-7">
            <label className="block text-sm font-medium text-gray-700">
              Task Title*
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter task title"
            />
          </div>
          <div className="mb-7">
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <div className="flex justify-center gap-2  mt-2">
              <button
                onClick={(e) => handleCategoryChange(e, "personal")}
                className={`px-4 py-2 rounded-md  ${
                  selectedCategory == "personal"
                    ? "bg-blue-500 text-gray-100"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                Personal
              </button>
              <button
                onClick={(e) => handleCategoryChange(e, "work")}
                className={`px-4 py-2 rounded-md   ${
                  selectedCategory === "work"
                    ? " bg-blue-500 text-gray-100"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                Work
              </button>
              <button
                onClick={(e) => handleCategoryChange(e, "study")}
                className={`px-4 py-2 rounded-md   ${
                  selectedCategory === "study"
                    ? " bg-blue-500 text-gray-100"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                Study
              </button>
            </div>
          </div>

          <div className="mb-7">
            <label className="block text-sm font-medium text-gray-700">
              Date & Time
            </label>
            <input
              value={timestamp}
              onChange={(e) => setTimestamp(e.target.value)}
              type="datetime-local"
              min={new Date().toISOString().slice(0, 16)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-7">
            <label className="block text-sm font-medium text-gray-700">
              Task Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter task description"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              className="mr-2 px-4 py-3 text-md border-blue-500 border text-blue-500 rounded-lg w-1/2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              onClick={(e) => handleSubmit(e)}
              className="px-4 py-3 text-md bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-1/2"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConfigureTaskModal;
