import { Router } from "express";
import { Route } from "../../types";
import { AuthController } from "../controllers";

class AuthRoute implements Route {
	public path = "/auth";
	public router = Router();
	public authController = new AuthController();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.post(`${this.path}login`, this.authController.logIn);
	}
}

export { AuthRoute };
