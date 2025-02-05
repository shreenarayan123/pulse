import { TaskValidation } from "@/lib/ZodValidation";
import { Task } from "@/model/task-mode";
import { NextRequest, NextResponse } from "next/server";


//delete task
export async function DELETE(
  request:NextRequest, 
  context:{params:{id:string}}
): Promise<NextResponse>{
  try {
      const {id }= context.params;
    
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
    request:NextRequest, 
    context:{params:{id:string}}
): Promise<NextResponse>{
    try {
        const {id }= context.params;
        const reqBody = await request.json();
        const { title, content, deadline, priority,status  } = reqBody;
        const {success} = TaskValidation.safeParse(reqBody);
                if(!success){
                    return  NextResponse.json({error:"Fields can not be empty"}, {status:500});
                }else{
                    
                try {
                    const updatedTask = await Task.findByIdAndUpdate(id,
                        {
                            title: title, 
                            content: content, 
                            deadline: deadline,
                            priority: priority,
                            status: status
                        },
                        { new: true })
                    await updatedTask.save();
                    return NextResponse.json({
                        message:"task updated",
                        updatedTask
                    })
                } catch (error) {
                    return NextResponse.json({error:"Task not found"}, {status:404});
                }
                }
    } catch (error:any) {
        return NextResponse.json({error:error.message}, {status:500})        
    }

}