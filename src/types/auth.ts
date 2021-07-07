import { Request } from "express";
import { UserDto } from "../api/DTOs";

import socketio from "socket.io";

export interface UserRequest extends Request {
	user?: UserDto;
	io?: socketio.Server;
}
