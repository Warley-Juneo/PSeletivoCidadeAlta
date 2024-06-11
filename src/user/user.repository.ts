import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { User } from './entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: User): Promise<User> {
    return await this.prisma.user.create({ data });
  }

  async login(email: string, password: string): Promise<User> {
    return await this.prisma.user.findUniqueOrThrow({
      where: { email, password },
    });
  }

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async findOne(email: string): Promise<User> {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async update(email: string, data: Partial<User>) {
    return await this.prisma.user.update({ where: { email }, data });
  }

  async remove(email: string) {
    return await this.prisma.user.delete({ where: { email } });
  }
}
