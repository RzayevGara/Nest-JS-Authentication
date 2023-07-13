import { DataSource } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
const envModule = ConfigModule.forRoot({
  isGlobal: true,
});

export const appDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABAE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [__dirname + '/../**/*.entity.js'],
  migrations: ['src/migrations/**/*{.ts,.js}'],
});

appDataSource.initialize().then((_) => console.log('db connect'));
