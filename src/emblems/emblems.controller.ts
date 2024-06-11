import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { EmblemsService } from './emblems.service';
import { CreateEmblemDto, EmblemResponseDto } from './dto/create-emblem.dto';
import { UpdateEmblemDto } from './dto/update-emblem.dto';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';

@ApiTags('emblems')
@Controller('emblems')
export class EmblemsController {
  constructor(private readonly emblemsService: EmblemsService) {}

  @ApiBearerAuth('Authorization')
  @ApiOperation({ summary: 'Register a new emblem' })
  @ApiExtraModels(CreateEmblemDto, EmblemResponseDto)
  @ApiResponse({
    status: 201,
    description: 'emblem registered successfully',
    schema: {
      $ref: getSchemaPath(EmblemResponseDto),
    },
  })
  @Post()
  create(@Body() createEmblemDto: CreateEmblemDto): Promise<EmblemResponseDto> {
    return this.emblemsService.create(createEmblemDto);
  }

  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'offset', required: false })
  @ApiQuery({ name: 'name', required: false })
  @ApiQuery({ name: 'slug', required: false })
  @ApiBearerAuth('Authorization')
  @ApiOperation({ summary: 'find all emblem' })
  @ApiExtraModels(CreateEmblemDto, EmblemResponseDto)
  @ApiResponse({
    status: 201,
    description: 'return all emblems',
    schema: {
      $ref: getSchemaPath(EmblemResponseDto),
    },
  })
  @Get()
  findAll(
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
    @Query('name') name?: string,
    @Query('slug') slug?: string,
  ): Promise<EmblemResponseDto[]> {
    return this.emblemsService.findAll(limit, offset, name, slug);
  }

  @ApiBearerAuth('Authorization')
  @ApiOperation({ summary: 'Find one emblem with slug' })
  @ApiExtraModels(CreateEmblemDto, EmblemResponseDto)
  @ApiResponse({
    status: 201,
    description: 'return one emblem or {}',
    schema: {
      $ref: getSchemaPath(EmblemResponseDto),
    },
  })
  @Get(':slug')
  findOne(@Param('slug') slug: string): Promise<EmblemResponseDto> {
    return this.emblemsService.findOne(slug);
  }

  @ApiBearerAuth('Authorization')
  @ApiOperation({ summary: 'Update a emblem' })
  @ApiExtraModels(CreateEmblemDto, EmblemResponseDto)
  @ApiResponse({
    status: 201,
    description: 'return emblem updated successfully',
    schema: {
      $ref: getSchemaPath(EmblemResponseDto),
    },
  })
  @Patch(':slug')
  update(
    @Param('slug') slug: string,
    @Body() updateEmblemDto: UpdateEmblemDto,
  ): Promise<EmblemResponseDto> {
    return this.emblemsService.update(slug, updateEmblemDto);
  }

  @ApiBearerAuth('Authorization')
  @ApiOperation({ summary: 'Soft delete a emblem' })
  @ApiExtraModels(CreateEmblemDto, EmblemResponseDto)
  @ApiResponse({
    status: 201,
    description: 'return emblem deleted successfully',
    schema: {
      $ref: getSchemaPath(EmblemResponseDto),
    },
  })
  @Delete(':slug')
  remove(@Param('slug') slug: string) {
    return this.emblemsService.remove(slug);
  }
}
