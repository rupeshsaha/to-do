import { useTasks } from "@/store/TaskContext";
import { formatMongoTime } from "@/utils/formatMongoTimestamp";
import { Pencil, SquarePen, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import ConfigureTaskModal from "./ConfigureTaskModal";

const dataCard = ({data}) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [editing, setIsEditing] = useState(false)
  
  const { deleteTask } = useTasks()
  
const handleTaskDelete = async (id) => {
  try {
   deleteTask(id)

  } catch (error) {
    console.error("Error deleting task:", error.message);
  }
};


  return (
    <div
      className="border rounded-xl shadow-md w-full px-4 py-2 bg-white flex flex-col items-start hover:border-blue-500  hover:shadow-lg transition duration-400"
    >
      <div className=" w-full flex border-b border-gray-300 py-2">
        <div className="w-2/3">
          <h1
            className={`md:text-xl text-lg font-semibold text-gray-900 ${
              isCompleted ? "line-through" : ""
            }`}
          >
            {data.title}
          </h1>

          <p
            className={`text-gray-600 text-sm truncate ${
              isCompleted ? "line-through" : ""
            }`}
          >
            {data.description}
          </p>
        </div>
        <div className="md:p-2 w-1/3 flex justify-end">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={(e) => setIsCompleted((prev) => !prev)}
              className="w-5 h-5 rounded-full "
            />
            <span className="text-gray-800 md:text-md text-sm">
              Mark as done
            </span>
          </label>
        </div>
      </div>

      <div className="flex justify-between items-center w-full text-sm text-gray-700 py-3">
        <div className="flex gap-4">
          <span
            className={`border  px-2 py-1 rounded-lg  ${
              data.category == "work"
                ? "bg-blue-100 text-blue-700"
                : data.category == "personal"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700 "
            } `}
          >
            {data.category.charAt(0).toUpperCase() +
              data.category.slice(1).toLowerCase()}
          </span>
        </div>
        <span className="text-gray-500">{formatMongoTime(data.timestamp)}</span>
        <div className="flex gap-4 ">
          <SquarePen color="#007bff" className="cursor-pointer" onClick={()=>setIsEditing(true)} />
          <Trash color="red" className="cursor-pointer" onClick={() => handleTaskDelete(data._id)} />
          <ConfigureTaskModal isOpen={editing} onClose={() => setIsEditing(false)} mode={"Edit"} data={ data } />
        </div>
      </div>
    </div>
  );
};

export default dataCard;
