import { NextFunction, Request, Response } from "express";
import { HttpException } from "../../exceptions";
import { Logger } from "../../lib";

export const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
	console.log("object");

	try {
		const status: number = error.status || 500;
		const message: string = error.message || "Something went wrong";
		const errors: string[] | undefined = error.errors;

		Logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);
		res.status(status).json({ message: message, errors: errors });
	} catch (error) {
		next(error);
	}
};
