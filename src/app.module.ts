import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ConfigModule, ConfigService} from '@nestjs/config';

import { config } from './configs/main.config';
import { AuthModule, UserModule } from './modules';
import {LoginValidationMiddleware, RegisterValidationMiddleware} from './middlewares';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => configService.get('database'),
      inject: [ConfigService]
    }),
    AuthModule,
    UserModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoginValidationMiddleware)
      .forRoutes({ path: 'user/login', method: RequestMethod.GET });
    consumer
      .apply(RegisterValidationMiddleware)
      .forRoutes({ path: 'user/register', method: RequestMethod.POST });
  }
}
