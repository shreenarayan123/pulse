'use client';
import { useGlobalContext } from "@/app/context/globalProvider";
import Content from "@/components/Content";
import { CreateTaskForm } from "@/components/CreateTaskForm";
import { EditTaskForm } from "@/components/TaskEditModal";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function page() {
  const { TaskFormModal, EditTaskModal } = useGlobalContext();

  return (
    <div className="w-full h-full">
      {TaskFormModal && <CreateTaskForm />}
      {EditTaskModal && <EditTaskForm/>}

      <Content />
    </div>
  );
}

export default page;
