import { Draggable } from '@hello-pangea/dnd';
import { SquarePen, Trash2 } from 'lucide-react'
import React from 'react'



type Priority = 'low' | 'mid' | 'high';
type Status = 'to do' | 'in progress' | 'completed';

interface Tasktype {
  id:string,
  title: string;
  content: string;
  status: Status;
  deadline: string;
  priority: Priority;
}

const getPriorityColor = (priority: Priority): string => {
  switch (priority) {
    case 'high': return 'bg-red-100 text-red-600 border-red-600';
    case 'mid': return 'bg-yellow-100 text-yellow-600 border-yellow-600';
    case 'low': return 'bg-cyan-100 text-cyan-600 border-cyan-600';
    default: return 'bg-gray-100 text-gray-600 border-gray-600';
  }
};

const getStatusColor = (status: Status): string => {
  switch (status) {
    case 'to do': return 'bg-blue-500 text-white';
    case 'in progress': return 'bg-yellow-500 text-white';
    case 'completed': return 'bg-green-500 text-white';
    default: return 'bg-gray-500 text-white';
  }
};



  const BoardTask: React.FC<{ task: Tasktype; index: number }> = ({ task, index }) => {
    const priorityColorClass = getPriorityColor(task.priority);
    const statusColorClass = getStatusColor(task.status);
    return (
      <Draggable draggableId={task.id} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className='flex flex-col w-full items-start px-5 py-4 bg-white rounded-xl gap-3 h-auto shadow-lg mb-3'
          >
            <div className='w-full'>
        <span className={`px-3 py-1 font-semibold border-2 rounded-xl text-sm ${priorityColorClass}`}>
          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
        </span>
      </div>
      <div className='flex flex-col items-start gap-3'>
        <span className='text-xl font-semibold'>
          {task.title}
        </span>
        <p className='text-gray-400'>
          {task.content}
        </p>
      </div>
      <div className='w-full flex items-center'>
        <div className='w-full'>
          <span className={`px-3 py-1 font-semibold rounded-xl text-sm ${statusColorClass}`}>
            {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
          </span>
        </div>
        <div className='flex items-center gap-2'> 
          <SquarePen className="cursor-pointer" />
          <Trash2 className="cursor-pointer" />
        </div>
      </div>
          </div>
        )}
      </Draggable>
    );
  };
export default BoardTask