import { NextFunction, Request, Response } from "express";
import { Logger } from "../../lib";
import { AuthService } from "../services";

class AuthController {
	public authService = new AuthService();

	public logIn = async (_req: Request, _res: Response, next: NextFunction): Promise<void> => {
		try {
			Logger.info("Log In Controller");
			this.authService.login();
		} catch (error) {
			next(error);
		}
	};
}

export { AuthController };
