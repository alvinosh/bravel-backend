import * as dotenv from "dotenv";

dotenv.config({ path: "./.env" });

export const __prod__ = process.env.NODE_ENV === "production";
export const __port__ = process.env.PORT;
