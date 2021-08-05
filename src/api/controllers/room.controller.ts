import { NextFunction, Response } from "express";
import { Logger } from "../../lib";
import { UserRequest } from "src/types/auth";
import { RoomService } from "../services";
import { RoomDto } from "../DTOs";

class RoomController {
  public roomService = new RoomService();

  public print = (req: UserRequest, res: Response, next: NextFunction): any => {
    try {
      let user_ids: string[]; // get user ids
      let admin_ids: string[]; // get admin ids

      let owner_id: string[]; //get owener ids

      let room: RoomDto;
    } catch (error) {
      next(error);
    }
  };
}

export { RoomController };
