"use client";

import { ChevronDown, ChevronUp, Plus, SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Task from "../components/Task";
import React, { useEffect, useState } from "react";
import { TaskType } from "@/actions/task/types";
import { getTask } from "@/actions/task";
import { useGlobalContext } from "@/app/context/globalProvider";

const Content = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const { setTaskFormModal } = useGlobalContext();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const result = await getTask();
        const data = await  result.map((task: any) => ({
          ...task,
          status: task.status.toLowerCase(),
          priority: task.priority.toLowerCase(),
        })) as TaskType[];
        console.log(data, "Data");
        setTasks(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchTasks();
  }, []);

  const [position, setPosition] = useState("bottom");
  const [dropMenu, setDropMenu] = useState(false);
  const [dropSort, setDropSort] = useState(false);

  return (
    <div className="bg-white h-full w-full flex flex-col items-center ">
      <div className="w-full flex items-start justify-start pt-3 pl-5 border-b-2 border-gray-100 pb-4">
        <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
          Search
        </label>
        <div className="relative w-[40%]">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <SearchIcon className="h-5 text-gray-500" />
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900  rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Tasks "
            required
          />
        </div>
      </div>
      <div className="w-full flex items-center justify-between pt-4">
        <span className="text-2xl font-bold font-sans flex w-full pl-10">
          All Tasks
        </span>
        <div className="w-full flex    mb-5 gap-10">
          <div className=" ">
            <DropdownMenu open={dropMenu} onOpenChange={setDropMenu}>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex gap-2">
                  Filter by status {dropMenu ? <ChevronUp /> : <ChevronDown />}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={position}
                  onValueChange={setPosition}
                >
                  <DropdownMenuRadioItem value="top">
                    To Do
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="bottom">
                    In Progress
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="right">
                    Completed
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className=" ">
            <DropdownMenu open={dropSort} onOpenChange={setDropSort}>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex gap-2">
                  Sort by priority {dropSort ? <ChevronUp /> : <ChevronDown />}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={position}
                  onValueChange={setPosition}
                >
                  <DropdownMenuRadioItem value="top">Low</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="bottom">
                    Medium
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="right">
                    High
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Button
            onClick={() => setTaskFormModal(true)}
            className="bg-blue-500 flex items-center gap-2"
          >
            <Plus /> Add new Task
          </Button>
        </div>
      </div>

      <div className="w-full grid grid-cols-2 overflow-y-scroll lg:grid-cols-4 h-[87%] bg-slate-100  p-5 gap-3 border-t-2 border-gray-100">
        <div>
          {tasks.map((task) => (
            <Task key={task._id} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Content;
