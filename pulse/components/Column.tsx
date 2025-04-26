import React from "react";
import BoardTask from "./BoardTask";
import { Droppable } from "@hello-pangea/dnd";
import Todo from "../app/assets/Todo.png";
import Completed from "../app/assets/Completed.png";
import Inprogress from "../app/assets/Inprogress.png";
import { StaticImageData } from "next/image";
import { TaskType } from "@/actions/task/types";

interface ColumnProps {
  title: string;
  tasks: TaskType[];
}

const Column: React.FC<ColumnProps> = ({ title, tasks }) => {
  const getImageForTitle = (title: string): StaticImageData => {
    switch (title.toLowerCase()) {
      case "to do":
        return Todo;
      case "in progress":
        return Inprogress;
      case "completed":
        return Completed;
      default:
        return Todo;
    }
  };

  return (
    <Droppable droppableId={title}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="w-[29%] flex flex-col items-center gap-3 min-h-[500px] p-4 rounded-lg"
        >
          <div className="w-full flex items-center gap-5 justify-center mb-5">
            <img
              src={getImageForTitle(title).src}
              alt={title}
              className="w-12 h-12 hidden md:block"
            />
            <span className="font-sans text-xl font-bold mb-4">{title}</span>
          </div>
          {tasks.map((task) => (
            <BoardTask key={task._id} task={task} index={parseInt(task._id)} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Column;
