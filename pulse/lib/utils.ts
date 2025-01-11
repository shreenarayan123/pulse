
import { Priority, Status } from "@/actions/task/types";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getPriorityColor = (priority: Priority): string => {
  switch (priority) {
    case 'High': return 'bg-red-100 text-red-600 border-red-600';
    case 'Mid': return 'bg-yellow-100 text-yellow-600 border-yellow-600';
    case 'Low': return 'bg-cyan-100 text-cyan-600 border-cyan-600';
    default: return 'bg-gray-100 text-gray-600 border-gray-600';
  }
};

export const getStatusColor = (status: Status): string => {
  switch (status) {
    case 'To do': return 'bg-blue-500 text-white';
    case 'In progress': return 'bg-yellow-500 text-white';
    case 'Completed': return 'bg-green-500 text-white';
    default: return 'bg-gray-500 text-white';
  }
};