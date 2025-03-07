import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import Routes from "./routes";

class App {
  public app: express.Application;
  public port: number | undefined;
  public routes: Routes;

  constructor() {
    dotenv.config();
    this.app = express();
    this.connectDB();
    this.routes = new Routes(this.app); // Initialize the routes property
  }

  connectDB() {
    const DB_URL = process.env.DB_URL;

    if (DB_URL) {
      mongoose
        .connect(DB_URL)
        .then(() => {
          console.log("Connected...");
        })
        .catch(() => {
          console.log("Error in Database");
        });
    }
  }

  listen() {
    const port = process.env.PORT;

    this.app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
  }
}

const app = new App();
app.listen();
