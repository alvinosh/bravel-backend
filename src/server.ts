import { Logger } from "./lib";
import { __port__ } from "./config";

class Server {
	port: string;

	constructor(port?: string) {
		this.port = __port__ || port || "8080";
	}

	public init() {
		this.loadDatabase();

		this.loadServer(this.port);
	}

	public loadServer(port: string) {
		Logger.info(`Server :: Loading Express Server on port ${port}`);
	}

	public loadDatabase() {
		Logger.info("Server :: Loading Database");
	}
}

export { Server };
