import { NextFunction, Request, Response } from "express";
import { LoginUserDto, SignupUserDto } from "../DTOs";
import { AuthService } from "../services";

class AuthController {
	public authService = new AuthService();

	public login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			const userData: LoginUserDto = req.body;
			const loginToken = await this.authService.login(userData);

			res.status(201).json({ token: loginToken, message: "login" });
		} catch (error) {
			next(error);
		}
	};

	public signup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			const userData: SignupUserDto = req.body;
			const signUpUserData = await this.authService.signup(userData);

			res.status(201).json({ data: signUpUserData, message: "signup" });
		} catch (error) {
			next(error);
		}
	};
}

export { AuthController };
