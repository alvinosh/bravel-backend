import { PrismaClient } from "@prisma/client";
import { Logger } from "../../lib";

class UsersService {
	private prisma: any;

	constructor() {
		this.prisma = new PrismaClient();
	}

	public async getAll() {
		Logger.info("yay");
	}
}

export { UsersService };
