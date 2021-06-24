import bcrypt from "bcrypt";

import { User } from "../../types/user";
import { Logger } from "../../lib";
import { HttpException } from "../../exceptions";

import { PrismaClient } from "@prisma/client";
import { SignupUserDto } from "../DTOs";

class AuthService {
	private prisma: any;

	constructor() {
		this.prisma = new PrismaClient();
	}

	public async signup(userData: SignupUserDto): Promise<any> {
		const findUser: User = await this.prisma.user.findUnique({
			where: {
				email: userData.email,
			},
		});

		if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`);

		const hashedPassword = await bcrypt.hash(userData.password, 10);

		const user = await this.prisma.user.create({
			data: {
				email: userData.email,
				first_name: userData.firstname,
				last_name: userData.lastname,
				password: hashedPassword,
				username: userData.username,
				online: true,
			},
		});

		return user;
	}

	public async login() {
		Logger.info("Log In Service");
	}
}

export { AuthService };
