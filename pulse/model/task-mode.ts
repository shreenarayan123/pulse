import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
});

export const Task = mongoose.models.Task ?? mongoose.model("Task", taskSchema);
