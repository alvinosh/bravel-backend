import { IsNotEmpty, IsNumber } from "class-validator";

export class LocationDto {
	@IsNumber({}, { message: "Latitude must be number" })
	@IsNotEmpty({ message: "Bad request no latitude field" })
	lat: number;
	@IsNumber({}, { message: "Longditue must be number" })
	@IsNotEmpty({ message: "Bad request no longditue field" })
	lon: number;
}
