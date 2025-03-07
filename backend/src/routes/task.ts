import { Router } from "express";
import TaskController from "../controller/TaskController";

class Task extends TaskController {
  public router: Router;
  public path = "/tasks";
  constructor() {
    super();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getTasks);
    this.router.get(`${this.path}/:id`, this.getTask);
    this.router.post(this.path, this.addTask);
    this.router.put(`${this.path}/:id`, this.updateTask);
    this.router.delete(`${this.path}/:id`, this.deleteTask);
  }
}

export default Task;
