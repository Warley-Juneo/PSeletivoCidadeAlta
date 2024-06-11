import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

type ParamObj = {
  id: string;
  email: string;
};

@Injectable()
export class JwtHelper {
  constructor(private readonly jwtService: JwtService) {}

  async jwtSign(data: ParamObj): Promise<string> {
    const payload = { sub: data.id, userEmail: data.email };
    const jwt_token = await this.jwtService.signAsync(payload, {
      expiresIn: '1h',
    });
    return jwt_token;
  }
}
