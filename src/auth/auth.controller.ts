import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signin')
  login() {
    return this.authService.login();
  }
  @Post('signup')
  register() {
    return { msg: 'Register' };
  }
}
