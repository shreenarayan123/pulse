import { Task } from "@/model/task-mode";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        const allTasks = await Task.find({});
        return NextResponse.json({
            message:"All tasks",
            allTasks
        })
    } catch (error:any) {
        return NextResponse.json({error:error.message}, {status:404})
    }
}