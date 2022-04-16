import { NextFunction, Response } from "express";
import { UserRequest } from "src/types/auth";
import { LoginUserDto, SignupUserDto, UserDto } from "../DTOs";
import { AuthService, UsersService } from "../services";

import * as jwt from "jsonwebtoken";
import { JWT_REFRESH_TOKEN, JWT_TOKEN, TOKEN_EXPIRE, TOKEN_REFRESH_EXPIRE } from "../../config";
import { Logger } from "../../lib";

class AuthController {
  public authService = new AuthService();
  public usersService = new UsersService();

  generateTokens(data: any) {
    let accessToken = jwt.sign(data, JWT_TOKEN, { expiresIn: TOKEN_EXPIRE });
    let refreshToken = jwt.sign(data, JWT_REFRESH_TOKEN, { expiresIn: TOKEN_REFRESH_EXPIRE });

    return { accessToken, refreshToken };
  }

  async verifyRefresh(email: string, token: string) {
    try {
      const decoded = (await jwt.verify(token, JWT_REFRESH_TOKEN)) as any;
      return decoded.email === email;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  public login = async (req: UserRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: LoginUserDto = req.body;
      const user = await this.authService.login(userData);
      const { accessToken, refreshToken } = this.generateTokens(user);

      res.status(201).json({ accessToken: accessToken, refreshToken: refreshToken, message: "login" });
    } catch (error) {
      next(error);
    }
  };

  public signup = async (req: UserRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: SignupUserDto = req.body;
      const user = await this.authService.signup(userData);
      const { accessToken, refreshToken } = this.generateTokens(user);

      res.status(201).json({ accessToken: accessToken, refreshToken: refreshToken, message: "signup" });
    } catch (error) {
      next(error);
    }
  };

  public refreshtoken = async (req: UserRequest, res: Response, _next: NextFunction): Promise<void> => {
    const { refreshToken } = req.body;

    const user_tok = (await jwt.verify(refreshToken, JWT_REFRESH_TOKEN)) as UserDto;
    const isValid = this.verifyRefresh(user_tok.email, refreshToken);

    const user = await this.usersService.getUser(user_tok.username);

    if (!isValid) {
      res.status(401).json({ success: false, error: "Invalid token,try login again" });
    } else {
      let accessToken;
      try {
        accessToken = jwt.sign(user, JWT_TOKEN, { expiresIn: TOKEN_EXPIRE });
      } catch (error) {
        Logger.error(error);
      }

      res.status(200).json({ success: true, accessToken });
    }
  };
}

export { AuthController };
