import {EntityRepository, Repository} from 'typeorm';
import * as bcrypt from "bcryptjs"

import { User } from '../models';
import {RegisterUserDTO} from "../dtos";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findUserByEmail(email: string) {
    return this.findOne({ email });
  }

  async createUser(registerUserDTO: RegisterUserDTO): Promise<User> {
    const hash = bcrypt.hashSync(registerUserDTO.password, bcrypt.genSaltSync(10))
    const user = {
      ...this.create(),
      ...registerUserDTO,
      password: hash,
    };
    
    return this.save(user);
  }
}