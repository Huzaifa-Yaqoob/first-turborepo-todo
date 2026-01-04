import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  description: { type: String, required: true },
  date: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

export const Todo = mongoose.model("Todo", todoSchema);