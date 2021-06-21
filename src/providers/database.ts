import { createConnection, Connection } from "typeorm";
import { db_config } from "../config";
class Database {
	public async init(): Promise<Connection> {
		const connection: Connection = await createConnection({
			type: "postgres",
			host: db_config.host,
			port: db_config.port,
			username: db_config.username,
			password: db_config.password,
			database: db_config.name,
		});

		return connection;
	}
}

const db = new Database();

export { db };
