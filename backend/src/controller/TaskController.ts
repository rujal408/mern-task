import { Request, Response } from "express";
import Task from "../model/Task";

class TaskController {
  protected getTasks = async (_: Request, res: Response) => {
    try {
      const tasks = await Task.find({});

      const priorityOrder = { high: 1, medium: 2, low: 3 };

      const sortedTasks = tasks.sort((a, b) => {
        const aPriority = a.priority as keyof typeof priorityOrder;
        const bPriority = b.priority as keyof typeof priorityOrder;
        if (priorityOrder[aPriority] < priorityOrder[bPriority]) return -1;
        if (priorityOrder[aPriority] > priorityOrder[bPriority]) return 1;

        // If priorities are the same, compare by due date
        return a.due_date.getTime() - b.due_date.getTime();
      });

      res.status(200).json({ data: sortedTasks });
    } catch (e) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  protected getTask = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const task = await Task.findById(id);
      if (!task) res.status(404).json({ message: "Task not found" });
      else res.status(200).json({ data: task });
    } catch (e) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  protected addTask = async (req: Request, res: Response) => {
    try {
      const { title, description, due_date, priority, status } = req.body;

      if (!title || !description || !due_date || !priority) {
        res.status(400).json({ message: "All fields are required" });
      } else {
        const newTask = new Task({
          title,
          description,
          due_date,
          priority,
          status,
        });
        await newTask.save();

        res
          .status(201)
          .json({ data: newTask, message: "Task created successfully" });
      }
    } catch (e) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  protected updateTask = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { title, description, due_date, priority, status } = req.body;

      const updatedTask = await Task.findByIdAndUpdate(
        id,
        { title, description, due_date, priority, status },
        { new: true, runValidators: true }
      );

      if (!updatedTask) {
        res.status(404).json({ message: "Task not found" });
      } else {
        res
          .status(200)
          .json({ data: updatedTask, message: "Task updated successfully" });
      }
    } catch (e) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  protected deleteTask = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deletedTask = await Task.findByIdAndDelete(id);

      if (!deletedTask) {
        res.status(404).json({ message: "Task not found" });
      } else {
        res.status(200).json({ message: "Task deleted successfully" });
      }
    } catch (e) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
}

export default TaskController;
