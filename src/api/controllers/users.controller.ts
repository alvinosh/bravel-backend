import { NextFunction, Response } from "express";
import { UserRequest } from "src/types/auth";
import { LocationDto, UserDto } from "../DTOs";
import { UsersService } from "../services";

class UsersController {
  public usersService = new UsersService();

  public getAll = async (_req: UserRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const users: UserDto[] = await this.usersService.getOnline();

      res.status(201).json({ users: users, message: "All Online Users" });
    } catch (error) {
      next(error);
    }
  };

  public getOne = async (req: UserRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      let usr = req.params.username;
      const user: UserDto = await this.usersService.getUser(usr);

      res.status(201).json({ user: user, message: "User" });
    } catch (error) {
      next(error);
    }
  };

  public online = async (req: UserRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user: UserDto = await this.usersService.setStatus(req.user!, true);
      req.app.get("socketio").emit("user-change", user);

      res.status(201).json({ users: user, message: "Online" });
    } catch (error) {
      next(error);
    }
  };

  public offline = async (req: UserRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user: UserDto = await this.usersService.setStatus(req.user!, false);

      req.app.get("socketio").emit("user-change", user);

      res.status(201).json({ users: user, message: "Online" });
    } catch (error) {
      next(error);
    }
  };

  public updateLocation = async (req: UserRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const loc: LocationDto = {
        lat: req.body["lat"],
        lon: req.body["lon"]
      };

      const user: UserDto = await this.usersService.updateLocation(req.user!, loc);

      req.app.get("socketio").emit("user-change", user);

      res.status(201).json({ users: user, message: "Online" });
    } catch (error) {
      next(error);
    }
  };

  public deleteRoom = async (req: UserRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const roomid = req.body["id"];

      const user = await this.usersService.deleteRoom(req.user!.username, roomid);

      req.app.get("socketio").emit("room-change");

      res.status(201).json({ users: user, message: `User ${req.user!.username} left room` });
    } catch (error) {
      next(error);
    }
  };
}

export { UsersController };
