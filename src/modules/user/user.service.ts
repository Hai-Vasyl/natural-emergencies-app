import { Injectable } from '@nestjs/common';

import { AuthTokenDto, AuthPayloadDto, RegisterUserDTO } from '../../dtos';
import { AuthService } from '../auth/auth.service';
import { UserRepository } from '../../repositories';

@Injectable()
export class UserService {
  constructor(
    private readonly authService: AuthService,
    private readonly userRepository: UserRepository,
  ) {}

  loginUser(authPayloadDto: AuthPayloadDto): Promise<AuthTokenDto> {
    return this.authService.login(authPayloadDto);
  }

  async registerUser(registerUserDTO: RegisterUserDTO): Promise<AuthTokenDto> {
    await this.authService.validateUserRegister(registerUserDTO);
    const user = await this.userRepository.createUser(registerUserDTO);

    return this.authService.login({ userId: user.id });
  }
}
