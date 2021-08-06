import { RoomDto } from "./room.dto";
import { UserDto } from "./user.dto";

export class Message {
  id: Number;
  text: String;
  sender: UserDto;
  room: RoomDto;
}
