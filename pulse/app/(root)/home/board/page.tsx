"use client"
import React, { useEffect, useState } from 'react'
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import Column from '@/components/Column'
import { useRouter } from 'next/navigation';
import { Priority, Status, TaskType } from '@/actions/task/types';
import { getTask } from '@/actions/task';



const Page: React.FC = () => {

  const [allTasks, setallTasks] = useState<TaskType[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const result = await getTask();
        setallTasks(result);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    
    fetchTasks();
  }, []);

       
  
  const initialTasks: TaskType[] = allTasks.map((task, index) => ({
    ...task,
    id: `task-${index + 1}`,
    status: task.status as Status,
    priority: task.priority as Priority
  }));

  const [tasks, setTasks] = useState<TaskType[]>(initialTasks);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const updatedTasks = Array.from(tasks);
    const [reorderedTask] = updatedTasks.splice(source.index, 1);
    updatedTasks.splice(destination.index, 0, {
      ...reorderedTask,
      status: destination.droppableId as Status,
    });

    setTasks(updatedTasks);
  };
  console.log( initialTasks, 'tasks');

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="bg-slate-100 min-h-screen w-full flex items-start md:gap-10 md:p-10 p-2 justify-center">
        <Column title="To do" tasks={initialTasks.filter(task => task.status === 'To do')} />
        <Column title="In progress" tasks={initialTasks.filter(task => task.status === 'In progress')} />
        <Column title="Completed" tasks={initialTasks.filter(task => task.status ==='Completed')} />
      </div>
    </DragDropContext>
  );
};

export default Page;