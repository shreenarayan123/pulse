import React from 'react'
import BoardTask from './BoardTask';
import { Droppable } from '@hello-pangea/dnd';
import Todo from '../app/assets/Todo.png';
import Completed from '../app/assets/Completed.png';
import Inprogress from '../app/assets/Inprogress.png';
import { StaticImageData } from 'next/image';

type Priority = 'low' | 'mid' | 'high';
type Status = 'to do' | 'in progress' | 'completed';

interface Task {
  id: string;
  title: string;
  content: string;
  status: Status;
  deadline: string;
  priority: Priority;
}

interface ColumnProps {
  title: string;
  tasks: Task[];
}

const Column: React.FC<ColumnProps> = ({ title, tasks }) => {
  const getImageForTitle = (title: string): StaticImageData => {
    switch (title.toLowerCase()) {
      case 'to do':
        return Todo;
      case 'in progress':
        return Inprogress;
      case 'completed':
        return Completed;
      default:
        return Todo; // Default image if title doesn't match
    }
  };

  return (
    <Droppable droppableId={title}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className='w-[29%] flex flex-col items-center gap-3 min-h-[500px] p-4 rounded-lg'
        >
          <div className='w-full flex items-center gap-5 justify-center mb-5'>
            <img src={getImageForTitle(title).src} alt={title} className="w-12 h-12" />
            <span className='font-sans text-xl font-bold mb-4'>{title}</span>
          </div>
          {tasks.map((task, index) => (
            <BoardTask key={task.id} task={task} index={parseInt(task.id)} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Column;