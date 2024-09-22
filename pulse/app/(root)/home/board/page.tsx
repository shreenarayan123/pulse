"use client"
import React, { useState } from 'react'
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import Column from '@/components/Column'
import { useRouter } from 'next/navigation';

type Priority = 'low' | 'mid' | 'high';
type Status = 'to do' | 'in progress' | 'completed';

interface Task {
  id: string; // Added id field
  title: string;
  content: string;
  status: Status;
  deadline: string;
  priority: Priority;
}

// This would typically be imported from a JSON file or fetched from an API
const taskData = {
  "data": [
    {
      "title": "Complete project proposal",
      "content": "Draft and finalize the project proposal for the new client",
      "status": "in progress",
      "deadline": "2024-10-15",
      "priority": "high"
    },
    {
      "title": "Review code changes",
      "content": "Go through the pull requests and review code changes",
      "status": "to do",
      "deadline": "2024-09-30",
      "priority": "mid"
    },
    {
      "title": "Update documentation",
      "content": "Update the user manual with the latest features",
      "status": "completed",
      "deadline": "2024-09-20",
      "priority": "low"
    },
    {
      "title": "Prepare for team meeting",
      "content": "Gather progress reports and prepare slides for the weekly team meeting",
      "status": "to do",
      "deadline": "2024-09-25",
      "priority": "mid"
    },
    {
      "title": "Optimize database queries",
      "content": "Identify and optimize slow-running database queries to improve performance",
      "status": "in progress",
      "deadline": "2024-10-05",
      "priority": "high"
    }
  ]
};

const Page: React.FC = () => {

  const router = useRouter();
  const token = localStorage.getItem('token');
        if (!token) {
          router.push('/');
        }
  // Transform the imported data to include an id for each task
  const initialTasks: Task[] = taskData.data.map((task, index) => ({
    ...task,
    id: `task-${index + 1}`,
    status: task.status as Status,
    priority: task.priority as Priority
  }));

  const [tasks, setTasks] = useState<Task[]>(initialTasks);

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

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="bg-slate-100 min-h-screen w-full flex items-start gap-10 p-10 justify-center">
        <Column title="To Do" tasks={tasks.filter(task => task.status === 'to do')} />
        <Column title="In Progress" tasks={tasks.filter(task => task.status === 'in progress')} />
        <Column title="Completed" tasks={tasks.filter(task => task.status === 'completed')} />
      </div>
    </DragDropContext>
  );
};

export default Page;