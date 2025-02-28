"use client"
import ConfigureTaskModal from "@/components/ConfigureTaskModal";
import TasksContainer from "@/components/TasksContainer";
import { Bell, Plus, PlusCircle } from "lucide-react";
import React, { useState } from "react";

const Page = () => {
  const [creating, setIsCreating] = useState(false)

  return (
    <div className="grid grid-cols-12 bg-blue-50 graph-paper min-h-screen">
      <div className="lg:col-span-2 md:col-span-1  hidden md:block"></div>

      <div className="lg:col-span-8 md:col-span-10 col-span-12">
        <nav className="w-full flex justify-between items-center py-4 px-4  md:text-5xl text-3xl font-bold">
          <h1 className="">Todo List</h1>
          <Bell className="cursor-pointer" />
        </nav>

        <TasksContainer />
        <Plus
          size={50}
          color="white"
          onClick={()=>setIsCreating(true)}
          className="md:hidden block  rounded-full right-5 bottom-10 bg-blue-500 fixed"
        />
        
          
            <ConfigureTaskModal isOpen={creating} onClose={()=>setIsCreating(false)} mode={"Create"}/>
          
  
      </div>

      <div className="lg:col-span-2 md:col-span-1 hidden md:block"></div>
    </div>
  );
};

export default Page;
