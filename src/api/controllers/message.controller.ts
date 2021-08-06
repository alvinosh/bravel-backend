import { NextFunction, Response } from "express";
import { UserRequest } from "../../types/auth";
import { MessageService } from "../services";

class MessageController {
  public messgeService = new MessageService();

  public createMessage = async (req: UserRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      let room_id = req.body["room_id"];
      let content = req.body["message"];
      let username = req.user!.username;

      let message = await this.messgeService.createMessage(username, content, room_id);
      req.app.get("socketio").emit("room-change", room_id);

      res.status(201).json({ message_content: message, message: `Message sent to room ${room_id} ` });
    } catch (error) {
      next(error);
    }
  };
}

export { MessageController };
