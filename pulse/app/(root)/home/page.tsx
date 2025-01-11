'use client';
import { useGlobalContext } from "@/app/context/globalProvider";
import Content from "@/components/Content";
import { CreateTaskForm } from "@/components/CreateTaskForm";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function page() {
  const { TaskFormModal } = useGlobalContext();

  return (
    <div className="w-full h-full">
      {TaskFormModal && <CreateTaskForm />}

      <Content />
    </div>
  );
}

export default page;
