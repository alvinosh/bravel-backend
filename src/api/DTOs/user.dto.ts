import { Length, IsString } from "class-validator";

export class LoginUserDto {
	@IsString()
	@Length(3, 22)
	public username: string;

	@IsString()
	@Length(6, 30)
	public password: string;
}
