import { Router } from "express";
import { Route } from "../../types";
import { MessageController } from "../controllers";
import { authMiddleware } from "../middleware";
class MessageRoute implements Route {
  public path = "/";
  public router = Router();
  public roomController = new MessageController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {}
}

export { MessageRoute };
