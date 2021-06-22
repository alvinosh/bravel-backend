import { Logger } from "./lib";
import { __port__ } from "./config";
import { db } from "./providers";

class Server {
	port: string;

	constructor() {
		this.port = __port__ || "8080";
	}

	public async init() {
		await Promise.all([this.loadDatabase(), this.loadServer(this.port)]);
	}

	public async loadServer(port: string) {
		Logger.info(`Server :: Loading Express Server on port ${port}`);
	}

	public async loadDatabase() {
		Logger.info("Server :: Loading Database");
		db.init();
	}
}

export default new Server();
