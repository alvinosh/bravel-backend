import { PrismaClient } from "@prisma/client";
import { HttpException } from "../../exceptions";
import { Message } from "../DTOs";

class MessageService {
  private prisma: any;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async createMessage(user: string, message: string, roomid: number): Promise<Message> {
    let room = await this.prisma.group.findUnique({
      where: {
        id: roomid
      },
      include: {
        users: true
      }
    });

    if (!room) throw new HttpException(404, "Not Found", ["Room was not found"]);

    if (
      !room.users.filter((u: any) => {
        return u.username == user;
      })
    ) {
      throw new HttpException(401, "Unauthorized", ["User is not part of this room"]);
    }

    return this.prisma.messages.create({
      data: {
        text: message,
        sender: {
          connect: { username: user }
        },
        group: {
          connect: { id: roomid }
        }
      }
    });
  }
}

export { MessageService };
