import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import {addTransactionalDataSource, getDataSourceByName} from 'typeorm-transactional';
import { DataSource } from 'typeorm';
import { StoryModule } from './story/story.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory() {
        return {
          type: 'postgres',
          host: process.env.DB_HOST,
          port: parseInt(process.env.DB_PORT),
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_DATABASE,
          synchronize: process.env.DB_SYNC === 'true',
          timezone: 'Z',
          entities: [__dirname + '/**/*.entity{.ts,.js}']
        };
      },
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid options passed');
        }

        return getDataSourceByName("default") || addTransactionalDataSource(new DataSource(options));
      },
    }),
    StoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
