import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  CreateUserDto,
  GetEmblemDto,
  LoginUserDto,
  LoginUserResponseDto,
  UserResponseDto,
} from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth('Authorization')
  @ApiOperation({ summary: 'Register user' })
  @ApiExtraModels(CreateUserDto, UserResponseDto)
  @ApiResponse({
    status: 200,
    description: 'show user if registred successfully or error',
    schema: {
      $ref: getSchemaPath(UserResponseDto),
    },
  })
  @Post('register')
  create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return this.userService.create(createUserDto);
  }

  @ApiBearerAuth('Authorization')
  @ApiOperation({ summary: 'Login user' })
  @ApiExtraModels(LoginUserDto, UserResponseDto)
  @ApiResponse({
    status: 200,
    description: 'show user with token if successfully',
    schema: {
      $ref: getSchemaPath(UserResponseDto),
    },
  })
  @Post('login')
  login(@Body() loginUserDto: LoginUserDto): Promise<LoginUserResponseDto> {
    return this.userService.login(loginUserDto);
  }

  @ApiBearerAuth('Authorization')
  @ApiOperation({ summary: 'Show all user' })
  @ApiExtraModels(UserResponseDto)
  @ApiResponse({
    status: 200,
    description: 'show user[] if successfully or {} if not users',
    schema: {
      $ref: getSchemaPath(UserResponseDto),
    },
  })
  @Get()
  findAll(): Promise<UserResponseDto[]> {
    return this.userService.findAll();
  }

  @ApiBearerAuth('Authorization')
  @ApiOperation({ summary: 'find user' })
  @ApiExtraModels(UserResponseDto)
  @ApiResponse({
    status: 200,
    description:
      'show user if successfully or bad request error if user not found',
    schema: {
      $ref: getSchemaPath(UserResponseDto),
    },
  })
  @Get(':email')
  findOne(@Param('email') email: string): Promise<UserResponseDto> {
    return this.userService.findOne(email);
  }

  @ApiBearerAuth('Authorization')
  @ApiOperation({ summary: 'Update user' })
  @ApiExtraModels(UpdateUserDto, UserResponseDto)
  @ApiResponse({
    status: 200,
    description:
      'show user if updated successfully or bad request error if user not found',
    schema: {
      $ref: getSchemaPath(UserResponseDto),
    },
  })
  @Patch(':email')
  update(
    @Param('email') email: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.userService.update(email, updateUserDto);
  }

  @ApiBearerAuth('Authorization')
  @ApiOperation({ summary: 'Delete user' })
  @ApiExtraModels(GetEmblemDto, UserResponseDto)
  @ApiResponse({
    status: 200,
    description:
      'show user if deleted successfully or bad request error if user not found',
    schema: {
      $ref: getSchemaPath(UserResponseDto),
    },
  })
  @Delete(':email')
  remove(@Param('email') email: string): Promise<UserResponseDto> {
    return this.userService.remove(email);
  }

  @ApiBearerAuth('Authorization')
  @ApiOperation({ summary: 'get new emblem a user' })
  @ApiExtraModels(GetEmblemDto, UserResponseDto)
  @ApiResponse({
    status: 200,
    description:
      'show user if emblem added successfully or {} if user already has emblem',
    schema: {
      $ref: getSchemaPath(UserResponseDto),
    },
  })
  @Post('getEmblem')
  getEmblem(@Body() data: GetEmblemDto): Promise<UserResponseDto | void> {
    return this.userService.addEmblemToUser(data);
  }
}
