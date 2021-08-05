import { Router } from "express";
import { Route } from "../../types";
import { RoomController } from "../controllers";
import { authMiddleware, validationMiddleware } from "../middleware";

class RoomRoute implements Route {
  public path = "/";
  public router = Router();
  public roomController = new RoomController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post("/room", authMiddleware, this.roomController.print);
  }
}

export { RoomRoute };
