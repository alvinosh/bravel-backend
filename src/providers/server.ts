import express from "express";
import cors from "cors";
import hpp from "hpp";
import helmet from "helmet";
import compression from "compression";
import http from "http";
import socketio from "socket.io";

import { Logger } from "../lib";
import { __domain__, __port__, __prod__ } from "../config";
import { morganMiddleware } from "../api/middleware";
import { Route } from "../types";
import { routes } from "../config";

class Server {
	private app: express.Application;
	private server: http.Server;
	private io: socketio.Server;
	private port: number;

	public async init() {
		this.app = express();

		this.server = http.createServer(this.app);

		this.initMiddleware();
		this.initSocket();
		this.initializeRoutes(routes);

		this.listen();
	}

	private async listen() {
		this.server.listen(__port__, () => {
			Logger.info(`Server listening on port ${__port__}`);
		});

		this.io.on("connect", (socket: any) => {
			Logger.info("Connected client on port %s.", this.port);

			socket.on("disconnect", () => {
				Logger.info("Client disconnected");
			});
		});
	}

	private initializeRoutes(routes: Route[]) {
		routes.forEach((route) => {
			this.app.use("/", route.router);
		});
	}

	private async initMiddleware() {
		if (__prod__) {
			this.app.use(morganMiddleware);
			this.app.use(cors({ origin: __domain__, credentials: true }));
		} else {
			this.app.use(morganMiddleware);
			this.app.use(cors({ origin: true, credentials: true }));
		}

		this.app.use(hpp());
		this.app.use(helmet());
		this.app.use(compression());
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
	}

	private async initSocket() {
		this.io = require("socket.io")(this.server).listen(this.server, { origins: "*:*" });
		Logger.info("IO Socket listening");
	}
}

export const server = new Server();
