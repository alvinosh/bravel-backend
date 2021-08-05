import { NextFunction, Response } from "express";
import { UserRequest } from "../../types/auth";
import { RoomService } from "../services";
import { RoomDto } from "../DTOs";

class RoomController {
  public roomService = new RoomService();

  public createRoom = async (req: UserRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const users: string[] = req.body["users"];
      const admins: string[] = req.body["admins"];

      const name: string = req.body["name"];

      const owner: string = req.user!.username;

      const room: RoomDto = await this.roomService.createRoom(name, users, admins, owner);

      res.status(201).json({ room: room, message: `Room with owner ${owner} created` });
    } catch (error) {
      next(error);
    }
  };
}

export { RoomController };
