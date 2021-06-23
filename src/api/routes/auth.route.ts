import { Router } from "express";
import { Route } from "../../types";

class AuthRoute implements Route {
	public path = "/";
	public router = Router();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.post(`${this.path}login`);
	}
}

export default AuthRoute;
