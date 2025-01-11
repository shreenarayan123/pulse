'use client'
import { z } from "zod";


const TaskSchema = z.object({
    title:z.string()
           .nonempty()
           .min(3, "Title is too short !")
           .max(50, "Title cannot exceed 50 charaters"),

    content:z.string()
           .nonempty()
           .min(20, "Title is too short !")
           .max(500, "Title cannot exceed 50 charaters"),

    priority:z.enum(["Low", "Medium", "High"],{
        errorMap:()=>({message:"Please select a valid priority"})
    }),

    status:z.enum(["To do", "In progress", "Completed"],{
        errorMap:()=>({message:"Please select a valid status"})
    }),

    deadline:z.string()
              .date()

});

type Task = z.infer<typeof TaskSchema>;

export { TaskSchema, type Task}