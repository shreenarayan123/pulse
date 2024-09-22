import React from 'react'
import Task from './Task'
import BoardTask from './BoardTask';
import { Droppable } from '@hello-pangea/dnd';



type Priority = 'low' | 'mid' | 'high';
type Status = 'to do' | 'in progress' | 'completed';
interface Task {
  id:string;
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
    return (
      <Droppable droppableId={title}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className='w-[29%] flex flex-col items-center gap-3 min-h-[500px]  p-4 rounded-lg'
          >
            <span className='font-sans text-xl font-bold mb-4'>{title}</span>
            {tasks.map((task, index) => (
              <BoardTask key={task.id} task={task} index={parseInt(task.id)} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  };

export default Column