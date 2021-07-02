import { NextFunction, Response } from "express";
import { UserRequest } from "src/types/auth";
import { UserDto } from "../DTOs";
import { UsersService } from "../services";

class UsersController {
	public usersService = new UsersService();

	public getAll = async (_req: UserRequest, res: Response, next: NextFunction): Promise<void> => {
		try {
			const users: UserDto[] = await this.usersService.getOnline();

			res.status(201).json({ users: users, message: "All Online Users" });
		} catch (error) {
			next(error);
		}
	};
}

export { UsersController };
