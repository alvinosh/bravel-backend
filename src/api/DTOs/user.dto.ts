import { Type } from "class-transformer";

import { Length, IsString, Matches, IsEmail, IsNotEmpty, IsBoolean, ValidateNested, IsOptional } from "class-validator";
import { Match } from "../validators";
import { LocationDto } from "../DTOs";

export class LoginUserDto {
	@IsNotEmpty({ message: "Please enter username" })
	public username: string;

	@IsNotEmpty({ message: "Please enter password" })
	public password: string;
}

export class SignupUserDto {
	@IsString({ message: "Username must contain characters" })
	@Length(3, 20, { message: "Username must be between 3 and 20 characters long" })
	@IsNotEmpty({ message: "Please enter username" })
	public username: string;

	@Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
		message: "Password must be minimum eight characters and contain at least one letter and one number",
	}) // Minimum eight characters, at least one letter and one number:
	@IsNotEmpty({ message: "Please enter password" })
	public password: string;

	@IsString({ message: "First Name must contain characters" })
	@Length(2, 20, { message: "First Name must be between 2 and 20 characters long" })
	@IsNotEmpty({ message: "Please enter first name" })
	public firstname: string;

	@IsString({ message: "Last Name must contain characters" })
	@Length(2, 20, { message: "Last Name must be between 2 and 20 characters long" })
	@IsNotEmpty({ message: "Please enter last name" })
	public lastname: string;

	@IsEmail(undefined, { message: "Email is invalid" })
	@IsNotEmpty({ message: "Please enter email" })
	public email: string;

	@Match("password", {
		message: "Passwords do not match",
	})
	@IsNotEmpty({ message: "Please confirm password" })
	public confirmpassword: string;

	@IsOptional()
	@IsBoolean({ message: "Online value must be true or false" })
	@IsNotEmpty({ message: "Bad request no online field" })
	public online: boolean;

	@IsNotEmpty({ message: "Bad request no loc field" })
	@ValidateNested()
	@Type(() => LocationDto)
	public location: LocationDto;
}

export class UserDto {
	public username: string;

	public firstname: string;

	public lastname: string;

	public email: string;

	public online: boolean;

	public location: LocationDto;
}
