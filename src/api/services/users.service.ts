import { PrismaClient } from "@prisma/client";
import { UserDto } from "../DTOs";

class UsersService {
	private prisma: any;

	constructor() {
		this.prisma = new PrismaClient();
	}

	public async getOnline(): Promise<UserDto[]> {
		return this.prisma.user.findMany({
			where: {
				online: true,
			},

			include: {
				location: true,
			},
		});
	}
}

export { UsersService };
