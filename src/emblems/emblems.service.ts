import { Injectable } from '@nestjs/common';
import { CreateEmblemDto, EmblemResponseDto } from './dto/create-emblem.dto';
import { UpdateEmblemDto } from './dto/update-emblem.dto';
import { EmblemsRepository } from './emblems.repository';
import { Emblem } from './entities/emblem.entity';

@Injectable()
export class EmblemsService {
  constructor(private readonly emblemsRepository: EmblemsRepository) {}

  async create(createEmblemDto: CreateEmblemDto): Promise<EmblemResponseDto> {
    const emblem_obj = new Emblem(createEmblemDto);
    const result = await this.emblemsRepository.create(emblem_obj);
    return new EmblemResponseDto(result);
  }

  async findAll(
    limit?: string,
    offset?: string,
    name?: string,
    slug?: string,
  ): Promise<EmblemResponseDto[]> {
    try {
      const result = await this.emblemsRepository.findAll(
        limit?.length ? parseInt(limit, 10) : undefined,
        offset?.length ? parseInt(offset, 10) : undefined,
        name,
        slug,
      );
      return result.map((emblem) => new EmblemResponseDto(emblem));
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(slug: string): Promise<EmblemResponseDto> {
    const result = await this.emblemsRepository.findOne(slug);
    return new EmblemResponseDto(result);
  }

  async update(
    slug: string,
    updateEmblemDto: UpdateEmblemDto,
  ): Promise<EmblemResponseDto> {
    const result = await this.emblemsRepository.update(slug, updateEmblemDto);
    return new EmblemResponseDto(result);
  }

  async remove(slug: string): Promise<EmblemResponseDto> {
    const result = await this.emblemsRepository.remove(slug);
    return new EmblemResponseDto(result);
  }
}
