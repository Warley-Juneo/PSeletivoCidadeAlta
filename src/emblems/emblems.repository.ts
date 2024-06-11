// repository for emblems

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Emblem } from './entities/emblem.entity';

@Injectable()
export class EmblemsRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Emblem): Promise<Emblem> {
    return this.prisma.emblem.create({
      data,
    });
  }

  async findAll(
    limit?: number,
    offset?: number,
    name?: string,
    slug?: string,
  ): Promise<Emblem[]> {
    const where = {};
    if (name) {
      where['name'] = { contains: name };
    }
    if (slug) {
      where['slug'] = { contains: slug };
    }
    return this.prisma.emblem.findMany({
      take: limit,
      skip: offset,
      where,
    });
  }

  async findOne(slug: string): Promise<Emblem> {
    return this.prisma.emblem.findUnique({
      where: { slug },
    });
  }

  async update(slug: string, data: Partial<Emblem>) {
    return this.prisma.emblem.update({
      where: { slug },
      data,
    });
  }

  async remove(slug: string) {
    return this.prisma.emblem.update({
      where: { slug },
      data: {
        is_active: false,
        deletedAt: new Date(),
      },
    });
  }
}
