import { UserDto } from "./user.dto";

export class RoomDto {
  name: string;
  users: UserDto[];
  admins: UserDto[];
  owner: UserDto;
}
