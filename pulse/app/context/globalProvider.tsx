"use client";

import { TaskType } from "@/actions/task/types";
import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";

interface GlobalContextProps {
  isSideBar: boolean;
  TaskFormModal: boolean;
  setTaskFormModal: Dispatch<SetStateAction<boolean>>;
  EditTaskModal: boolean;
  setEditTaskModal: Dispatch<SetStateAction<boolean>>;
  tasks: TaskType[];
  setTasks: Dispatch<SetStateAction<TaskType[]>>;
  editPost: TaskType;
  setEditPost: Dispatch<SetStateAction<TaskType>>;
  taskStatus: string;
  setTaskStatus: Dispatch<SetStateAction<string>>;
  taskPriority: string;
  setTaskPriority: Dispatch<SetStateAction<string>>;
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
}

const GlobalContext = createContext<GlobalContextProps>({
  isSideBar: false,
  TaskFormModal: false,
  setTaskFormModal: () => {},
  EditTaskModal: false,
  setEditTaskModal: () => {},
  editPost: {} as TaskType,
  setEditPost: () => {},
  taskStatus: "",
  setTaskStatus: () => {},
  taskPriority: "",
  setTaskPriority: () => {},
  searchTerm: "",
  setSearchTerm: () => {},
  tasks: [],
  setTasks: () => {},
});
const GlobalUpdateContext = createContext<Dispatch<SetStateAction<boolean>>>(
  (() => {}) as Dispatch<SetStateAction<boolean>>
);

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalUpdateContext = () => useContext(GlobalUpdateContext);

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSideBar, setIsSideBar] = useState(false);
  const [TaskFormModal, setTaskFormModal] = useState(false);
  const [EditTaskModal, setEditTaskModal] = useState(false);
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [editPost, setEditPost] = useState<TaskType>({} as TaskType);
  const [taskStatus, setTaskStatus] = useState<string>("");
  const [taskPriority, setTaskPriority] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <GlobalContext.Provider
      value={{
        isSideBar,
        TaskFormModal,
        setTaskFormModal,
        EditTaskModal,
        setEditTaskModal,
        tasks,
        setTasks,
        editPost,
        setEditPost,
        taskStatus,
        setTaskStatus,
        taskPriority,
        setTaskPriority,
        searchTerm,
        setSearchTerm,
      }}
    >
      <GlobalUpdateContext.Provider value={setIsSideBar}>
        {children}
      </GlobalUpdateContext.Provider>
    </GlobalContext.Provider>
  );
};
