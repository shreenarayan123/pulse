"use client";
import React, { useEffect, useState } from "react";
import { SquarePen, Trash2 } from "lucide-react";
import { TaskType } from "@/actions/task/types";
import { deleteTask } from "@/actions/task";
import { getDateColor, getPriorityColor, getStatusColor } from "@/lib/utils";
import { useGlobalContext } from "@/app/context/globalProvider";
import { formatDate } from "@/lib/DateFormat";

interface TaskCardProps {
  task: TaskType;
}

const Task: React.FC<TaskCardProps> = ({ task }) => {
  const priorityColorClass = getPriorityColor(task.priority);
  const dateColorClass = getDateColor(task.priority);
  const statusColorClass = getStatusColor(task.status);
  const [date, setDate] = useState<string>("");
  const { setEditTaskModal, setTasks, setEditPost } = useGlobalContext();

  const handleDelete = async (task: TaskType) => {
    const result = await deleteTask(task);
    if (result.success) {
      setTasks((prevTasks) => prevTasks.filter((t) => t._id !== task._id));
    }
  };
  const handleEdit = (task: TaskType) => {
    setEditPost(task);
    setEditTaskModal(true);
  };
  useEffect(() => {
    const dueDate = formatDate(task.deadline);
    setDate(dueDate);
  }, [task.deadline]);

  return (
    <div className="flex flex-col w-auto items-center py-6 px-5 bg-white rounded-xl justify-between h-[225px]">
      <div className="w-full justify-between flex items-center">
        <span
          className={`md:px-3 md:py-1 px-1 font-semibold border-2 rounded-xl text-xs md:text-sm ${priorityColorClass}`}
        >
          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
        </span>
        <span className="md:px-3 md:py-1 font-semibold gap-2 text-xs md:text-lg flex items-center">
          Due <span className={` ${dateColorClass}`}>{date}</span>
        </span>
      </div>
      <div className="flex flex-col items-start gap-2">
        <span className="md:text-xl font-semibold">{task.title}</span>
        {task.content.length > 72 ? (
          <p className="text-gray-400 line-clamp-2">{task.content} </p>
        ) : (
          <p className="text-gray-400 ">{task.content}</p>
        )}
      </div>
      <div className="w-full flex items-center">
        <div className="w-full">
          <span
            className={`px-3 py-1 font-semibold rounded-xl text-xs hidden md:block md:text-sm ${statusColorClass}`}
          >
            {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <SquarePen
            className="cursor-pointer"
            onClick={() => handleEdit(task)}
          />
          <Trash2
            className="cursor-pointer"
            onClick={() => handleDelete(task)}
          />
        </div>
      </div>
    </div>
  );
};

export default Task;
