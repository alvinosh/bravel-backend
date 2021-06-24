import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { RequestHandler } from "express";
import { HttpException } from "../../exceptions";

type Value = "body" | "query" | "params";

export const validationMiddleware = (type: any, value: Value = "body"): RequestHandler => {
	return (req, _res, next) => {
		validate(plainToClass(type, req[value])).then((errors: ValidationError[]) => {
			if (errors.length > 0) {
				const message = errors.map((error: ValidationError) => Object.values(error.constraints!)).join(", ");
				next(new HttpException(400, message));
			} else {
				next();
			}
		});
	};
};
