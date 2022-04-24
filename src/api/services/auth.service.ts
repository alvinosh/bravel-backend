import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

import { HttpException } from "../../exceptions";
import { LoginUserDto, SignupUserDto, UserDto } from "../DTOs";
import { PSW_HASH } from "../../config";
class AuthService {
  private prisma: any;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async login(userData: LoginUserDto): Promise<UserDto> {
    let user: any = await this.prisma.user.findFirst({
      where: {
        OR: [{ username: userData.username }, { email: userData.username }]
      },
      include: {
        location: true
      }
    });

    if (!user) throw new HttpException(401, "Unauthorized", ["Username does not exist"]);

    const verified: boolean = await bcrypt.compare(userData.password, user.password);

    if (!verified) throw new HttpException(401, "Unauthorized", ["Password is incorrect"]);

    return this.getPayload(user);
  }

  public async signup(userData: SignupUserDto): Promise<UserDto> {
    const findUsers: any = await this.prisma.user.findMany({
      where: {
        OR: [{ email: userData.email }, { username: userData.username }]
      }
    });
    for (let i = 0; i < findUsers.length; i++) {
      if (findUsers[i].email == userData.email)
        throw new HttpException(409, "Email In use", ["This email address already exists"]);
      if (findUsers[i].username == userData.username)
        throw new HttpException(409, "Username in Use", ["This username already exists"]);
    }

    const hashedPassword = await bcrypt.hash(userData.password, PSW_HASH);

    const user = await this.prisma.user.create({
      data: {
        email: userData.email,
        first_name: userData.firstname,
        last_name: userData.lastname,
        password: hashedPassword,
        username: userData.username,
        location: {
          create: {
            lat: userData.location.lat,
            lon: userData.location.lon
          }
        },
        online: true
      }
    });

    return this.getPayload(user);
  }

  private getPayload(user: any): UserDto {
    return {
      email: user.email,
      username: user.username,
      firstname: user.first_name,
      lastname: user.last_name,
      location: user.location,
      online: user.online
    };
  }
}

export { AuthService };
