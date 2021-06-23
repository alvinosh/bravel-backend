import { Logger } from "./lib";
import { __port__ } from "./config";
import { db, server } from "./providers";

export class App {
	public async init() {
		await Promise.all([this.loadDatabase(), this.loadServer()]);
	}

	public async loadServer() {
		Logger.info(`Server :: Loading Express Server on port ${__port__}`);
		await server.init();
	}

	public async loadDatabase() {
		Logger.info("Server :: Loading Database");
		await db.init();
	}
}
