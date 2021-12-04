import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { UserService } from './user.service';
import { LocalAuthGuard } from '../../guards';
import { AuthTokenDto, RegisterUserDTO } from '../../dtos';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(LocalAuthGuard)
  @Get('login')
  login(@Request() req): Promise<AuthTokenDto> {
    return this.userService.loginUser({ userId: req.user.id });
  }

  @Post('register')
  register(@Body() registerUserDTO: RegisterUserDTO): Promise<AuthTokenDto> {
    return this.userService.registerUser(registerUserDTO);
  }
}
