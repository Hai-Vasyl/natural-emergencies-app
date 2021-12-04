import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { UserRepository } from '../../repositories';
import { User } from '../../models';
import {
  AuthPayloadDto,
  RegisterUserDTO,
  AuthTokenDto,
  LoginUserDTO,
} from '../../dtos';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateUserLogin(loginUserDTO: LoginUserDTO): Promise<User> {
    const user = await this.userRepository.findUserByEmail(loginUserDTO.email);
    if (!user) {
      throw new UnauthorizedException([{
        message: 'User with this email in not exists',
        param: 'email',
      }]);
    }

    const isValidPassword = bcrypt.compareSync(
      loginUserDTO.password,
      user.password,
    );
    if (!isValidPassword) {
      throw new UnauthorizedException([{
        message: 'Password is wrong, try another one',
        param: 'password',
      }]);
    }

    return user;
  }

  async validateUserRegister(registerUserDTO: RegisterUserDTO): Promise<void> {
    const user = await this.userRepository.findUserByEmail(
      registerUserDTO.email,
    );

    if (user) {
      throw new UnauthorizedException([{
        message: 'User with this email is already exists',
        param: 'email',
      }]);
    }
  }

  async login(payload: AuthPayloadDto): Promise<AuthTokenDto> {
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
