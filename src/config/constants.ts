import * as dotenv from "dotenv";
import { DatabaseConfig } from "src/types";

dotenv.config({ path: "./.env" });

export const __prod__ = process.env.NODE_ENV === "production";
export const __port__ = process.env.PORT;

export const db_config: DatabaseConfig = {
	host: process.env.DB_HOST!,
	port: +process.env.DB_PORT!,
	username: process.env.DB_USER!,
	password: process.env.DB_PASSWORD!,
	name: process.env.DB_NAME!,
};
