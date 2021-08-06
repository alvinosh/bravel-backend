import { Router } from "express";
import { Route } from "../../types";
import { MessageController } from "../controllers";
import { authMiddleware } from "../middleware";
class MessageRoute implements Route {
  public path = "/";
  public router = Router();
  public messageController = new MessageController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post("/message", authMiddleware, this.messageController.createMessage);
  }
}

export { MessageRoute };
