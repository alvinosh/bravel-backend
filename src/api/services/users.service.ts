import { PrismaClient, Prisma } from "@prisma/client";
import { UserDto } from "../DTOs";

class UsersService {
	private prisma: any;

	basicUser: Prisma.UserSelect = {
		id: true,
		createdAt: true,
		email: true,
		first_name: true,
		last_name: true,
		location: {
			select: {
				lat: true,
				lon: true,
			},
		},
		online: true,
		username: true,
		role: true,
	};

	constructor() {
		this.prisma = new PrismaClient();
	}

	public async getOnline(): Promise<UserDto[]> {
		return this.prisma.user.findMany({
			where: {
				online: true,
			},
			select: this.basicUser,
		});
	}

	public async getUser(username: string): Promise<UserDto> {
		return this.prisma.user.findUnique({
			where: {
				username: username,
			},
			select: this.basicUser,
		});
	}

	public async setStatus(user: UserDto, status: boolean): Promise<UserDto> {
		return this.prisma.user.update({
			where: {
				username: user.username,
			},
			data: {
				online: status,
			},
			select: this.basicUser,
		});
	}
}

export { UsersService };
