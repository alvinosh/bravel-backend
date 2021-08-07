import { PrismaClient, Prisma, User } from "@prisma/client";
import { LocationDto, UserDto } from "../DTOs";

class UsersService {
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

  public async getOnline(): Promise<UserDto[]> {
    return this.prisma.user.findMany({
      where: {
        online: true
      },
      select: this.basicUser
    });
  }

  public async getUser(username: string): Promise<UserDto> {
    return this.prisma.user.findUnique({
      where: {
        username: username
      },
      select: this.basicUser
    });
  }

  public async getUsers(usernames: string[]): Promise<UserDto[]> {
    return this.prisma.user.findMany({
      where: {
        username: usernames
      },
      select: this.basicUser
    });
  }

  public async setStatus(user: UserDto, status: boolean): Promise<UserDto> {
    return this.prisma.user.update({
      where: {
        username: user.username
      },
      data: {
        online: status
      },
      select: this.basicUser
    });
  }

  public async updateLocation(user: UserDto, loc: LocationDto): Promise<UserDto> {
    return this.prisma.user.update({
      where: {
        username: user.username
      },
      data: {
        location: {
          update: {
            lat: loc.lat,
            lon: loc.lon
          }
        }
      }
    });
  }

  public async deleteRoom(user: string, room_id: number): Promise<any> {
    let group = await this.prisma.group.findUnique({
      where: {
        id: room_id
      },
      include: {
        users: true,
        admins: true,
        owner: true
      }
    });

    if (group.users.length <= 1) {
      await this.prisma.group.delete({
        where: {
          id: room_id
        }
      });
    } else if (group.owner.username === user) {
      await this.prisma.group.delete({
        where: {
          id: room_id
        }
      });
    } else {
      await this.prisma.group.update({
        where: {
          id: room_id
        },
        data: {
          users: {
            disconnect: { username: user }
          },
          admins: {
            disconnect: { username: user }
          }
        }
      });
    }
  }
}

export { UsersService };
