'use server';

import { Task } from "@/model/task-mode";
import { TaskType } from "./types";
import dbConnect from "@/lib/mongo";
export type Priority = 'Low' | 'Medium' | 'High';
export type Status = 'To do' | 'In progress' | 'Completed';

 export interface TaskTypes {
  title: string;
  content: string;
  status: Status;
  deadline: string;
  priority: Priority;
}
 await dbConnect();
export const createTask = async (task:TaskTypes)=>{
  const res = await Task.create(task);
  return {};
}
export const getTask = async (): Promise<TaskType[]> => {
  try {
    const tasks = await Task.find({}, '_id title content status deadline priority').lean();
    const tasktypes = tasks.map(task => ({
      _id: (task._id as string).toString(),
      title: task.title,
      content: task.content,
      status: task.status,
      deadline: task.deadline.toLocaleDateString(),
      priority: task.priority,
    })) as TaskType[];
    return tasktypes;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return Promise.reject(error);
  }
};




export const updateTask = async (task:TaskType)=>{
    const id = task._id;
    const res =  Task.findByIdAndUpdate(id, task);
    return res;
}

export const deleteTask = async (task:TaskType)=>{
    const id = task._id;
    const res =  Task.findByIdAndDelete(id);
    return res;
}

