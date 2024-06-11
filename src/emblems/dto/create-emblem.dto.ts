import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEmblemDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiProperty()
  image?: string;

  constructor(emblem: Partial<CreateEmblemDto>) {
    this.name = emblem?.name;
    this.slug = emblem?.slug;
    this.image = emblem?.image;
  }
}

export class EmblemResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  is_active: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;

  constructor(emblem: Partial<EmblemResponseDto>) {
    this.id = emblem?.id;
    this.name = emblem?.name;
    this.slug = emblem?.slug;
    this.image = emblem?.image;
    this.is_active = emblem?.is_active;
    this.createdAt = emblem?.createdAt;
    this.updatedAt = emblem?.updatedAt;
    this.deletedAt = emblem?.deletedAt;
  }
}
