import { NextFunction, Request, Response } from "express";
import { User } from "../../types/user";
import { Logger } from "../../lib";
import { SignupUserDto } from "../DTOs";
import { AuthService } from "../services";

class AuthController {
	public authService = new AuthService();

	public signup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			const userData: SignupUserDto = req.body;
			const signUpUserData: User = await this.authService.signup(userData);

			res.status(201).json({ data: signUpUserData, message: "signup" });
		} catch (error) {
			next(error);
		}
	};

	public login = async (_req: Request, _res: Response, next: NextFunction): Promise<void> => {
		try {
			Logger.info("Log In Controller");
			this.authService.login();
		} catch (error) {
			next(error);
		}
	};
}

export { AuthController };
