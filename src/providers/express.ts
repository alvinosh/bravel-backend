import express from "express";
import cors from "cors";
import hpp from "hpp";
import helmet from "helmet";
import compression from "compression";

import { Logger } from "../lib";
import { __domain__, __port__, __prod__ } from "../config";
import { morganMiddleware } from "../api/middleware";

class ExpressServer {
	app: express.Application;
	port: number;

	public async init() {
		this.app = express();

		this.initMiddleware();

		this.app.listen(__port__, () => {
			Logger.info(`App listening on port ${__port__}`);
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
}

export const express_server = new ExpressServer();
