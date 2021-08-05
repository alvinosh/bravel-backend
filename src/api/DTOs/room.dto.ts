import { Message } from "./message.dto";
import { UserDto } from "./user.dto";

export class RoomDto {
  name: string;
  users: UserDto[];
  admins: UserDto[];
  owner: UserDto;
  messages: Message[];
}
