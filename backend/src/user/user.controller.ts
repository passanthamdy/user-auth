import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { SignupDto } from './dto/signup.dto';
import { AuthUserDto } from './dto/auth-user.dto.ts';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthRequest } from 'src/auth/interfaces/auth-request';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService, private readonly authService: AuthService) { }

  @Post('/actions/signup')
  async signup(@Body() signupDto: SignupDto) {
    return await this.userService.signup(signupDto);
  }

  @Post('/actions/login')
  @HttpCode(200)
  async login(@Body() credentials: AuthUserDto) {

    return await this.authService.authenticateUser(credentials);
    
  }

  @Post('/actions/refresh-token')
  @HttpCode(200)
   refreshToken(@Body() refreshToken: RefreshTokenDto) {
    return this.authService.refreshToken(refreshToken.refreshToken);
  }

  @UseGuards(AuthGuard)
  @Get('actions/me')
  @HttpCode(200)
  me(@Req() request: AuthRequest) {
    return this.userService.me(request.authUserId);
  }

}
