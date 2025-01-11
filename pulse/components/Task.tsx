'use client'
import React, { useEffect } from 'react';
import { SquarePen, Trash2 } from 'lucide-react';
import { Priority, Status, TaskType } from '@/actions/task/types';
import { deleteTask } from '@/actions/task';
import { getPriorityColor, getStatusColor } from '@/lib/utils';


interface TaskCardProps {
  task: TaskType;
}

const Task: React.FC<TaskCardProps> =  ({ task }) => {
  const priorityColorClass = getPriorityColor(task.priority);
  const statusColorClass = getStatusColor(task.status);

  return (
    <div className="flex flex-col w-auto items-center py-6 px-5 bg-white rounded-xl gap-4 h-min">
      <div className="w-full">
        <span className={`px-3 py-1 font-semibold border-2 rounded-xl text-sm ${priorityColorClass}`}>
          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
        </span>
      </div>
      <div className="flex flex-col items-start gap-3">
        <span className="text-xl font-semibold">{task.title}</span>
        <p className="text-gray-400">{task.content}</p>
      </div>
      <div className="w-full flex items-center">
        <div className="w-full">
          <span className={`px-3 py-1 font-semibold rounded-xl text-sm ${statusColorClass}`}>
            {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <SquarePen className="cursor-pointer" />
          <Trash2 className="cursor-pointer" onClick={() => deleteTask(task)} />
        </div>
      </div>
    </div>
  );
};


export default Task;