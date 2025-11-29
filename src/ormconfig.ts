import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions.js';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: +(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USER ?? 'postgres',
  password: String(process.env.DB_PASSWORD),

  database: process.env.DB_NAME ?? 'blog',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: (process.env.DB_SYNC ?? 'true') === 'true',
  logging: process.env.DB_LOGGING === 'true',
};

export default config;
