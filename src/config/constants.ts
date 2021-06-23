import * as dotenv from "dotenv";
import { DatabaseConfig } from "../types";

dotenv.config();

export const __prod__ = process.env.NODE_ENV === "production";
export const __port__ = process.env.PORT || "8080";

export const db_config: DatabaseConfig = {
	host: process.env.DB_HOST!,
	port: +process.env.DB_PORT!,
	username: process.env.DB_USER!,
	password: process.env.DB_PASSWORD!,
	name: process.env.DB_NAME!,
};

export const __domain__ = process.env.DOMAIN || "127.0.0.1";
