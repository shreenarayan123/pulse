
export type Priority = 'Low' | 'Mid' | 'High';
export type Status = 'To do' | 'In progress' | 'Completed';

 export interface TaskType {
  _id:string,
  title: string;
  content: string;
  status: Status;
  deadline: string;
  priority: Priority;
}

export interface getTaskResponseType{
    message:string;
    allTasks:TaskType[];

}