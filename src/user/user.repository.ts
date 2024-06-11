import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { User } from './entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: User): Promise<User> {
    const { id, emblems, ...dataWithoutIdandEmblems } = data;
    Number(id); // apenas para sumir o error de variável não utilizada
    String(emblems); // apenas para sumir o error de variável não utilizada

    return await this.prisma.user.create({
      data: dataWithoutIdandEmblems,
      include: {
        emblems: true,
      },
    });
  }

  async login(email: string, password: string): Promise<User> {
    return await this.prisma.user.findUniqueOrThrow({
      where: { email, password },
      include: {
        emblems: true,
      },
    });
  }

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany({
      include: {
        emblems: true,
      },
    });
  }

  async findOne(email: string): Promise<User> {
    return await this.prisma.user.findUnique({
      where: { email },
      include: {
        emblems: true,
      },
    });
  }

  async update(email: string, data: Partial<User>) {
    const { id, emblems, ...dataWithoutIdandEmblems } = data;
    Number(id); // apenas para sumir o error de variável não utilizada
    String(emblems); // apenas para sumir o error de variável não utilizada
    return await this.prisma.user.update({
      where: { email },
      data: dataWithoutIdandEmblems,
      include: {
        emblems: true,
      },
    });
  }

  async remove(email: string) {
    return await this.prisma.user.delete({ where: { email } });
  }

  async addEmblemToUser(email: string, slug: string): Promise<User> {
    const userAlreadyHasEmblem: User = await this.prisma.user.findFirst({
      where: {
        email,
        emblems: {
          some: {
            slug,
          },
        },
      },
      include: {
        emblems: true,
      },
    });

    if (userAlreadyHasEmblem) {
      return;
    }

    return await this.prisma.user.update({
      where: { email },
      data: {
        emblems: {
          connect: {
            slug: slug,
          },
        },
      },
      include: {
        emblems: true,
      },
    });
  }
}
