import { Request } from "express";
import { UserDto } from "../api/DTOs";

export interface UserRequest extends Request {
	user?: UserDto;
}
