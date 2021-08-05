import { PrismaClient, Prisma } from "@prisma/client";

class RoomService {
  private prisma: any;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async createRoom(name: string, u: string[], a: string[], o: string) {
    let user_ids = u.map((user) => {
      return { username: user };
    });
    let admin_ids = a.map((admin) => {
      return { username: admin };
    });

    user_ids.push({ username: o });
    admin_ids.push({ username: o });

    return this.prisma.group.create({
      data: {
        name: name,
        users: {
          connect: user_ids
        },
        admins: {
          connect: admin_ids
        },
        owner: {
          connect: { username: o }
        }
      }
    });
  }
}

export { RoomService };
