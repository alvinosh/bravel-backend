import { Router } from "express";
import { Route } from "../../types";
import { UsersController } from "../controllers";
import { authMiddleware } from "../middleware";

class UsersRoute implements Route {
  public path = "";
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`/users`, authMiddleware, this.usersController.getAll);
    this.router.get("/user/:username", this.usersController.getOne);

    this.router.post("/user/online", authMiddleware, this.usersController.online);
    this.router.post("/user/offline", authMiddleware, this.usersController.offline);
  }
}

export { UsersRoute };
