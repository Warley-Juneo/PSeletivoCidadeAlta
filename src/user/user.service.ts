import { BadRequestException, Injectable } from '@nestjs/common';
import {
  CreateUserDto,
  GetEmblemDto,
  LoginUserDto,
  LoginUserResponseDto,
  UserResponseDto,
} from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { JwtHelper } from 'src/helpers/jwt.service';
import { EmblemsService } from 'src/emblems/emblems.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwthelper: JwtHelper,
    private readonly emblemService: EmblemsService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const user_obj = new User(createUserDto);
    const result = await this.userRepository.create(user_obj);
    return new UserResponseDto(result);
  }

  async login(login: LoginUserDto): Promise<LoginUserResponseDto> {
    try {
      const result = await this.userRepository.login(
        login.email,
        login.password,
      );

      const data = { email: result.email, id: result.id.toString() };
      const jwt_token = await this.jwthelper.jwtSign(data);

      const userResponse = new UserResponseDto(result);
      return new LoginUserResponseDto({
        user: userResponse,
        jwt_token,
      });
    } catch (error) {
      throw new BadRequestException('Invalid email or password');
    }
  }

  async findAll(): Promise<UserResponseDto[]> {
    const result = await this.userRepository.findAll();
    return result.map((emblem) => new UserResponseDto(emblem));
  }

  async findOne(email: string): Promise<UserResponseDto> {
    const result = await this.userRepository.findOne(email);
    return new UserResponseDto(result);
  }

  async update(
    email: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const result = await this.userRepository.update(email, updateUserDto);
    return new UserResponseDto(result);
  }

  async remove(email: string): Promise<UserResponseDto> {
    const result = await this.userRepository.remove(email);
    return new UserResponseDto(result);
  }

  async addEmblemToUser(data: GetEmblemDto): Promise<UserResponseDto | void> {
    try {
      await this.findOne(data.user_email);

      await this.emblemService.findOne(data.emblem_slug);

      const result = await this.userRepository.addEmblemToUser(
        data.user_email,
        data.emblem_slug,
      );

      return new UserResponseDto(result);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
