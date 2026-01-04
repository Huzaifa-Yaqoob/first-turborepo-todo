import express from "express";
import cors from "cors";
import { dbConnect } from "./lib/dbConnect";
import { Todo } from "./lib/schema/todo.schema";

const app = express();
const port = process.env.PORT || 3001;

// Connect to Database
dbConnect();

app.use(cors());
app.use(express.json());

app.get("/status", (req, res) => {
  res.json({ ok: true });
});

app.post("/todos", async (req, res) => {
  try {
    const { description, date } = req.body;
    const newTodo = new Todo({ description, date });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: "Error creating todo", error });
  }
});

app.listen(port, () => {
  console.log(`api running on http://localhost:${port}`);
});
