import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt'; // Import the JwtModule
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [
    JwtModule.register({
      secret: 'your-secret-key', // Replace with your actual secret key
      signOptions: { expiresIn: '1d' }, // Adjust as needed
    }),
    TypeOrmModule.forFeature([User]),
    // You might also import ConfigModule here if you're using it for configuration
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
