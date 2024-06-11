import { Module } from '@nestjs/common';
import { EmblemsService } from './emblems.service';
import { EmblemsController } from './emblems.controller';
import { PrismaService } from 'src/database/prisma.service';
import { EmblemsRepository } from './emblems.repository';

@Module({
  controllers: [EmblemsController],
  providers: [EmblemsService, PrismaService, EmblemsRepository],
})
export class EmblemsModule {}
