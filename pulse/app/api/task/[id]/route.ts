import { TaskValidation } from "@/lib/ZodValidation";
import { Task } from "@/model/task-mode";
import { NextRequest, NextResponse } from "next/server";
import { use } from "react";


type Props = {
  params: {
    id: string
  }
}
//delete task
export async function DELETE(
  request: NextRequest,
  {params}: {params: Promise<{ id: string }> }
){
  try {
    const { id } = await use(params);
    
    if (!id) {
      return NextResponse.json(
        { error: "Id is required" }, 
        { status: 400 }
      );
    }

    const deletedTask = await Task.findByIdAndDelete(id);
    
    if (!deletedTask) {
      return NextResponse.json(
        { error: "Task not found" }, 
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Task deleted successfully",
      task: deletedTask
    }, { status: 200 });

  } catch (error: any) {
    console.error("Error deleting task:", error);
    return NextResponse.json(
      { error: "Internal server error" }, 
      { status: 500 }
    );
  }
}

//update task
export async function PUT(
  request: NextRequest,
  {params}: {params: Promise<{ id: string }> }
){
  try {
    const { id } = await use(params);
      const reqBody = await request.json();
      const { title, content, deadline, priority, status } = reqBody;
      
      const { success } = TaskValidation.safeParse(reqBody);
      if (!success) {
          return NextResponse.json({ error: "Fields can not be empty" }, { status: 500 });
      }

      const updatedTask = await Task.findByIdAndUpdate(
          id,
          { title, content, deadline, priority, status },
          { new: true }
      );
      
      if (!updatedTask) {
          return NextResponse.json({ error: "Task not found" }, { status: 404 });
      }

      await updatedTask.save();
      return NextResponse.json({
          message: "task updated",
          updatedTask
      });

  } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
  }
}