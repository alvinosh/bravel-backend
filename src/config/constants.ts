import * as dotenv from "dotenv";
import { AuthRoute, MessageRoute, RoomRoute, UsersRoute } from "../api/routes";
import { DatabaseConfig } from "../types";

dotenv.config();

export const __prod__ = process.env.NODE_ENV === "production";
export const __port__ = process.env.PORT || "8080";

export const db_config: DatabaseConfig = {
  host: process.env.DB_HOST!,
  port: +process.env.DB_PORT!,
  username: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  name: process.env.DB_NAME!
};

export const __domain__ = process.env.DOMAIN || "http://127.0.0.1:8080";

export const routes = [new UsersRoute(), new AuthRoute(), new RoomRoute(), new MessageRoute()];

export const PSW_HASH: number = +process.env.PASSWORD_HASH!;

export const JWT_TOKEN = process.env.JWT_TOKEN!;
export const JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_TOKEN!;

export const TOKEN_EXPIRE = "10s";
export const TOKEN_REFRESH_EXPIRE = "60d";
