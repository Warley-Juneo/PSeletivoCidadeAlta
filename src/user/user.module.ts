import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/database/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from './user.repository';
import { JwtHelper } from 'src/helpers/jwt.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [UserController],
  providers: [UserService, PrismaService, UserRepository, JwtHelper],
})
export class UserModule {}
