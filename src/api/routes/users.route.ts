import { Router } from "express";
import { Route } from "../../types";
import { UsersController } from "../controllers";
import { authMiddleware } from "../middleware";

class UsersRoute implements Route {
	public path = "/users";
	public router = Router();
	public usersController = new UsersController();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(``, authMiddleware, this.usersController.getAll);
	}
}

export { UsersRoute };
