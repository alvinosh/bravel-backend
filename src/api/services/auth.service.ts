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
		let findUsers: any = await this.prisma.user.findMany({
			where: {
				OR: [{ email: userData.email }, { username: userData.username }],
			},
		});
		for (let i = 0; i < findUsers.length; i++) {
			if (findUsers[i].email == userData.email) throw new HttpException(409, "This email address already exists");
			if (findUsers[i].username == userData.username) throw new HttpException(409, "This username already exists");
		}

		const hashedPassword = await bcrypt.hash(userData.password, 10);

		const user: User = await this.prisma.user.create({
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
