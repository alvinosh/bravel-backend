import { Logger } from "./lib";
import { __port__ } from "./config";
import { db, express_server } from "./providers";

class Server {
	public async init() {
		await Promise.all([this.loadDatabase(), this.loadServer()]);
	}

	public async loadServer() {
		Logger.info(`Server :: Loading Express Server on port ${__port__}`);
		await express_server.init();
	}

	public async loadDatabase() {
		Logger.info("Server :: Loading Database");
		await db.init();
	}
}

export default new Server();
