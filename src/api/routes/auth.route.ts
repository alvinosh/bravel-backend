import { Router } from "express";
import { Route } from "../../types";
import { AuthController } from "../controllers";
import { validationMiddleware } from "../middleware";
import { LoginUserDto } from "../DTOs";

class AuthRoute implements Route {
	public path = "/";
	public router = Router();
	public authController = new AuthController();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.post(`${this.path}login`, validationMiddleware(LoginUserDto, "body"), this.authController.logIn);
	}
}

export { AuthRoute };
