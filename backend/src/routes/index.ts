import cors from "cors";
import express from "express";
import Task from "./task";

// Define the routes for every module
class Routes {
  public app: express.Application;
  public task: Task;

  constructor(app: express.Application) {
    this.app = app;
    this.task = new Task();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.app.use(express.json()); // convert the request body into json (parse)
    this.app.use(express.urlencoded());
    this.app.use(cors());
    this.app.use("/api", this.task.router);
  }
}

export default Routes;
