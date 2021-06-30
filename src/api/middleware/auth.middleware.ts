import { Request, NextFunction, Response } from "express";
import jwt from "jsonwebtoken";

import { Logger } from "../../lib";
import { JWT_TOKEN } from "../../config";
import { HttpException } from "../../exceptions";
import { UserDto } from "../DTOs";

const authMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
	try {
		const Authorization = req.header("Authorization");

		if (Authorization) {
			const AuthKey = Authorization.split("Bearer ")[1];

			const verificationResponse = (await jwt.verify(AuthKey, JWT_TOKEN)) as UserDto;

			Logger.info(verificationResponse);

			next();
		} else {
			next(new HttpException(404, "Authentication token missing"));
		}
	} catch (error) {
		next(new HttpException(401, "Wrong authentication token"));
	}
};

export { authMiddleware };
