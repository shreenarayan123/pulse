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
 export const createTask = async (task: TaskTypes): Promise<{ success: boolean, task:TaskType }> => {
 const result = await Task.create(task);
 const plainObject = result.toObject(); 
  return { success: true ,
     task:{
      _id: plainObject._id.toString(), // Convert ObjectId to string
      title: plainObject.title,
      content: plainObject.content,
      status: plainObject.status,
      deadline: plainObject.deadline.toISOString(), // Convert Date to ISO string
      priority: plainObject.priority,
     }
    };
}
export const getTask = async (): Promise<TaskType[]> => {
  try {
    const tasks = await Task.find({}, '_id title content status deadline priority').lean();
    const tasktypes = tasks.map(task => ({
      _id: (task._id as string).toString(),
      title: task.title,
      content: task.content,
      status: task.status,
      deadline: task.deadline.toISOString(),
      priority: task.priority,
    })) as TaskType[];
    return JSON.parse(JSON.stringify(tasktypes));
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return Promise.reject(error);
  }
};




export const updateTask = async (task:TaskType): Promise<{ success: boolean, task:TaskType}>=>{
    const id = task._id;
 const result =await Task.findByIdAndUpdate(id, task, {new:true});
 const plainObject = result.toObject(); 
 return { success: true ,
    task:{
     _id: plainObject._id.toString(), // Convert ObjectId to string
     title: plainObject.title,
     content: plainObject.content,
     status: plainObject.status,
     deadline: plainObject.deadline.toISOString(), // Convert Date to ISO string
     priority: plainObject.priority,
    }
   };
}

export const deleteTask = async (task: TaskType) => {
  const id = task._id;
  await Task.findByIdAndDelete(id);
  return { success: true };
};


