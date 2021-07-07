import { NextFunction, Response } from "express";
import { UserRequest } from "src/types/auth";
import { LoginUserDto, SignupUserDto } from "../DTOs";
import { AuthService, UsersService } from "../services";

import * as jwt from "jsonwebtoken";
import { JWT_TOKEN, TOKEN_EXPIRE } from "../../config";

class AuthController {
	public authService = new AuthService();
	public usersService = new UsersService();

	public login = async (req: UserRequest, res: Response, next: NextFunction): Promise<void> => {
		try {
			const userData: LoginUserDto = req.body;
			const user = await this.authService.login(userData);
			const userToken = jwt.sign(user, JWT_TOKEN, { expiresIn: TOKEN_EXPIRE });

			res.status(201).json({ token: userToken, message: "login" });
		} catch (error) {
			next(error);
		}
	};

	public signup = async (req: UserRequest, res: Response, next: NextFunction): Promise<void> => {
		try {
			const userData: SignupUserDto = req.body;
			const user = await this.authService.signup(userData);
			const userToken = jwt.sign(user, JWT_TOKEN, { expiresIn: TOKEN_EXPIRE });

			res.status(201).json({ token: userToken, message: "signup" });
		} catch (error) {
			next(error);
		}
	};
}

export { AuthController };
