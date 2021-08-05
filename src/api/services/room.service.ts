import { PrismaClient, Prisma } from "@prisma/client";

class RoomService {
  private prisma: any;

  constructor() {
    this.prisma = new PrismaClient();
  }
}

export { RoomService };
