import { TaskValidation } from "@/lib/ZodValidation";
import { Task } from "@/model/task-mode";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const {title, content,deadline, priority, status} = reqBody;
        const {success} = TaskValidation.safeParse(reqBody);
        if(!success){
            return  NextResponse.json({error:"Fields can not be empty"}, {status:500});
        }else{
            
        const newtask = new Task ({
            title, 
            content, 
            deadline,
            priority,
            status
        })
        await newtask.save();
        return NextResponse.json({
            message:"task created",
            newtask
        })
        }
        
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
        
    }
    

}