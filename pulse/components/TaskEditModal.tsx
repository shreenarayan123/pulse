"use client";
import { EditTask } from "./form/EditForm";

export const EditTaskForm = () => {
  return (
    <div className="fixed inset-0 z-50 w-full">
      <div className="fixed inset-0 bg-white bg-opacity-25 backdrop-blur-sm w-full" />
      <div className="w-full h-full fixed inset-0 flex justify-center items-center bg-transparent ">
        <div className=" flex flex-col items-center bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative z-50">
          <EditTask />
        </div>
      </div>
    </div>
  );
};
1;
