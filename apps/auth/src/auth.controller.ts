import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CurrentUser } from './current-user.decorator';
import JwtAuthGuard from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from './users/schemas/user.schema';
import { GoogleAuthGuard } from './guards/google.auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    response.send({
      id: user._id,
      email: user.email
    });
  }
  
  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth() {
    console.log("done")
  }
  
  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@CurrentUser() user: User, @Res({ passthrough: true }) response: Response,) {
    await this.authService.login(user, response);
    response.send({
      id: user._id,
      email: user.email
    });;
  }


  @UseGuards(JwtAuthGuard)
  @MessagePattern('validate_user')
  async validateUser(@CurrentUser() user: User) {
    return user;
  }
}
