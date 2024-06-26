import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Emblem } from 'src/emblems/entities/emblem.entity';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsOptional()
  photo?: string;

  constructor(user: Partial<CreateUserDto>) {
    this.name = user?.name;
    this.email = user?.email;
    this.password = user?.password;
    this.photo = user?.photo;
  }
}

export class UserResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  photo: string;

  @ApiProperty()
  emblems: Emblem[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;

  constructor(user: Partial<UserResponseDto>) {
    this.id = user?.id;
    this.name = user?.name;
    this.email = user?.email;
    this.photo = user?.photo;
    this.emblems = user?.emblems;
    this.createdAt = user?.createdAt;
    this.updatedAt = user?.updatedAt;
    this.deletedAt = user?.deletedAt;
  }
}

export class LoginUserDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  constructor(user: Partial<LoginUserDto>) {
    this.email = user?.email;
    this.password = user?.password;
  }
}

export class LoginUserResponseDto {
  @ApiProperty()
  user: UserResponseDto;

  @ApiProperty()
  jwt_token: string;

  constructor(user: Partial<LoginUserResponseDto>) {
    this.user = user?.user;
    this.jwt_token = user?.jwt_token;
  }
}

export class GetEmblemDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  user_email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  emblem_slug: string;

  constructor(email: Partial<GetEmblemDto>) {
    this.user_email = email?.user_email;
    this.emblem_slug = email?.emblem_slug;
  }
}
