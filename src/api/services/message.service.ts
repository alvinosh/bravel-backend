import { PrismaClient, Prisma } from "@prisma/client";
import { RoomDto } from "../DTOs";

class MessageService {
  private prisma: any;

  constructor() {
    this.prisma = new PrismaClient();
  }
}

export { MessageService };
