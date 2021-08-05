import { PrismaClient, Prisma } from "@prisma/client";
import { RoomDto } from "../DTOs";

class RoomService {
  private prisma: any;

  basicUser: Prisma.UserSelect = {
    id: true,
    email: true,
    first_name: true,
    last_name: true,
    location: {
      select: {
        lat: true,
        lon: true
      }
    },
    online: true,
    username: true,
    role: true
  };

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async createRoom(name: string, u: string[], a: string[], o: string): Promise<RoomDto> {
    let user_ids: any = [];
    let admin_ids: any = [];
    if (u) {
      user_ids = u.map((user) => {
        return { username: user };
      });
    }
    if (a) {
      admin_ids = a.map((admin) => {
        return { username: admin };
      });
    }

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

  public async getRooms(name: string): Promise<RoomDto[]> {
    let data = await this.prisma.user.findUnique({
      where: {
        username: name
      },

      include: {
        group_user: {
          include: {
            users: {
              select: this.basicUser
            },
            admins: {
              select: this.basicUser
            },
            owner: {
              select: this.basicUser
            },
            messages: true
          }
        }
      }
    });

    return <RoomDto[]>data.group_user;
  }
}

export { RoomService };
