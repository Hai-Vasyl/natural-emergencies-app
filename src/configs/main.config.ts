import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const config = () => {
  const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME, JWT_SECRET } =
    process.env;

  return {
    database: {
      type: 'mysql',
      host: DB_HOST,
      port: parseInt(DB_PORT),
      username: DB_USERNAME,
      password: DB_PASSWORD,
      database: DB_NAME,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    } as TypeOrmModuleOptions,
    jwt: {
      secret: JWT_SECRET,
      signOptions: { expiresIn: '5h' },
    },
  };
};
