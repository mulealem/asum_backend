import { Controller, Post, Body, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      // return { message: 'Invalid credentials' };
      throw new HttpException('Invalid credentials', 401);
    }
    return this.authService.login(user);
  }
}
