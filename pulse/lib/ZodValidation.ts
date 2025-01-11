import z from "zod";

export const TaskValidation = z.object({
    title:z.string().nonempty(),
    content:z.string().nonempty(),
    deadline:z.string().date(),
   priority:z.string().nonempty(),
   status:z.string().nonempty(),
})