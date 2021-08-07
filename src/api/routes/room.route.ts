import { Router } from "express";
import { Route } from "../../types";
import { RoomController } from "../controllers";
import { authMiddleware } from "../middleware";
class RoomRoute implements Route {
  public path = "/";
  public router = Router();
  public roomController = new RoomController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post("/room", authMiddleware, this.roomController.createRoom);
    this.router.put("/room", authMiddleware, this.roomController.updateRoom);
    this.router.delete("/room/:id", authMiddleware, this.roomController.deleteRoom);

    this.router.get("/rooms", authMiddleware, this.roomController.getRooms);
  }
}

export { RoomRoute };
