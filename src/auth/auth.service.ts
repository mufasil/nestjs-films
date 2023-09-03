import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from '../shared/dto/user.dto';
import { User } from 'src/entities/user.entity';

@Injectable()
export class AuthService {

  constructor(
  private readonly jwtService: JwtService,@InjectRepository(User)
  private usersRepository: Repository<User>) {}

  async login(userDto: UserDto) {
    const { email, password } = userDto;
    // Find the user by email
    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Validate the password
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload);

    return { access_token: accessToken };
  }

  async register(userDto: UserDto) {
    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    const newUser = {
      first_name: userDto.first_name,
      last_name: userDto.last_name,
      email: userDto.email,
      password: hashedPassword,      
    };
    const user = this.usersRepository.create(newUser);
    return this.usersRepository.save(user);
  }
}
