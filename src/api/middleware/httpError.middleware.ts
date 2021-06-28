import { NextFunction, Request, Response } from "express";
import { HttpException } from "../../exceptions";
import { Logger } from "../../lib";

export const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
	console.log("object");

	try {
		const status: number = error.status || 500;
		const message: string = error.message || "Something went wrong";

		Logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);
		res.status(status).json({ message });
	} catch (error) {
		next(error);
	}
};
