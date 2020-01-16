import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import routes from "./routes";

class App {
  constructor() {
    this.server = express();

    this.mongoConnect();
    this.middlewares();
    this.routes();
  }

  mongoConnect() {
    const DB = process.env.DB_HOST.replace("<password>", process.env.DB_PASS);
    mongoose
      .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: true,
        useUnifiedTopology: true
      })
      .then(() => console.log("DB connection successful!"));
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
