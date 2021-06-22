import { PrismaClient } from "@prisma/client";
import { Logger } from "../lib";

class Database {
	prisma: any;

	public async init() {
		this.prisma = new PrismaClient();
		Logger.info("Prisma Connection Made");
	}
}

const db = new Database();

export { db };
