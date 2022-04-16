import express from "express";
import cors from "cors";
import hpp from "hpp";
import helmet from "helmet";
import compression from "compression";
import http from "http";
import { Server as IOServer } from "socket.io";
import morgan from "morgan";

import { Logger, stream } from "../lib";
import { __domain__, __port__, __prod__ } from "../config";
import { errorMiddleware } from "../api/middleware";
import { Route } from "../types";
import { routes } from "../config";
import { UserDto } from "../api/DTOs";
import { UsersService } from "../api/services";

class Server {
  private app: express.Application;
  private server: http.Server;
  private io: IOServer;

  private users: { [key: string]: string };

  public async init() {
    this.app = express();

    this.server = http.createServer(this.app);

    this.users = {};

    this.initMiddleware();

    this.initializeRoutes(routes);
    this.initErrorHandling();

    this.listen();
    this.initSocket();
  }

  private async listen() {
    this.server.listen(__port__, () => {
      Logger.info(`Server listening on port ${__port__}`);
    });
  }

  private initSocket() {
    this.io = require("socket.io")(this.server, {
      allowEIO3: true,
      cors: {
        origin: "*"
      }
    });

    this.app.set("socketio", this.io);

    this.io.on("connection", (socket) => {
      socket.on("join", (username) => {
        this.users[socket.id] = username;
      });

      socket.on("disconnect", async () => {
        let username = this.users[socket.id];
        delete this.users[socket.id];
        if (!Object.keys(this.users).find((key) => this.users[key] === username)) {
          let usersService = new UsersService();
          const user: UserDto = await usersService.setStatus(username, false);
          socket.emit("user-change", user);
        }
      });
    });

    Logger.info("IO Socket listening");
  }

  private initializeRoutes(routes: Route[]) {
    routes.forEach((route) => {
      this.app.use(route.path!, route.router);
    });
  }

  private async initMiddleware() {
    if (__prod__) {
      this.app.use(morgan("combined", { stream }));
      this.app.use(cors({ origin: __domain__, credentials: true }));
    } else {
      this.app.use(morgan("dev", { stream }));
      this.app.use(cors({ origin: true, credentials: true }));
    }

    this.app.use(errorMiddleware);

    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private async initErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export const server = new Server();
