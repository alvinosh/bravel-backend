import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { RequestHandler } from "express";
import { HttpException } from "../../exceptions";

type Value = "body" | "query" | "params";

export const validationMiddleware = (type: any, value: Value = "body"): RequestHandler => {
	return (req, _res, next) => {
		validate(plainToClass(type, req[value]), { forbidUnknownValues: true, stopAtFirstError: true }).then((errors: ValidationError[]) => {
			if (errors.length > 0) {
				let message = "Validation Error";

				let error_msgs: string[] = [];

				errors.forEach((error) => {
					if (error.constraints) {
						error_msgs.push(...Object.values(error.constraints));
					}
					if (error.children) {
						error.children.forEach((cerror) => {
							if (cerror.constraints) {
								error_msgs.push(...Object.values(cerror.constraints));
							}
						});
					}
				});

				next(new HttpException(400, message, error_msgs));
			} else {
				next();
			}
		});
	};
};
