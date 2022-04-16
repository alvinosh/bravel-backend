import { NextFunction, Response } from "express";
import { UserRequest } from "../../types/auth";

import jwt from "jsonwebtoken";

import { JWT_TOKEN } from "../../config";
import { HttpException } from "../../exceptions";
import { UserDto } from "../DTOs";
import { Logger } from "../../lib";

const authMiddleware = async (req: UserRequest, _res: Response, next: NextFunction) => {
  try {
    const Authorization = req.header("Authorization");

    if (Authorization) {
      const AuthKey = Authorization.split("Bearer ")[1];

      const verificationResponse = (await jwt.verify(AuthKey, JWT_TOKEN)) as UserDto;

      req.user = verificationResponse;

      next();
    } else {
      next(new HttpException(404, "Authentication token missing"));
    }
  } catch (error) {
    Logger.error(error);

    next(new HttpException(401, "Wrong authentication token"));
  }
};

export { authMiddleware };
