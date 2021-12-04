import { Injectable } from '@nestjs/common';
import * as Joi from 'joi';

import { ValidationMiddleware } from './validation.middleware';

@Injectable()
export class LoginValidationMiddleware extends ValidationMiddleware {
  schema = Joi.object({
    email: Joi.string().required().email().label('Email'),
    password: Joi.string().required().min(4).label('Password'),
  }).options({ abortEarly: false });
}
