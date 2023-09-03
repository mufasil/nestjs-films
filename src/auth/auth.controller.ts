import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from '../shared/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() userDto: UserDto) {
    return this.authService.login(userDto);
  }

  @Post('register')
  async register(@Body() userDto: UserDto) {
    return this.authService.register(userDto);
  }
}
