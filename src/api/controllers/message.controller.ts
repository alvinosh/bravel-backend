import { NextFunction, Response } from "express";
import { UserRequest } from "../../types/auth";
import { MessageService } from "../services";
import { RoomDto } from "../DTOs";

class MessageController {
  public messgeService = new MessageService();

  public createMessage = async (req: UserRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
    } catch (error) {
      next(error);
    }
  };
}

export { MessageController };
