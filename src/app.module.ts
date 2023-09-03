import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import * as dotenv from "dotenv";

import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { FilmModule } from "./film/film.module";
import { SharedModule } from "./shared/shared.module";
import { User } from "./entities/user.entity";
import { Genre } from "./entities/genre.entity";
import { Film } from "./entities/film.entity";
import { Comment } from "./entities/comment.entity";
// import { UsersModule } from './users/users.module';
import { ElasticsearchModule } from './elasticsearch/elasticsearch.module';

@Module({
  imports: [
    AuthModule,
    FilmModule,
    SharedModule,
    ConfigModule.forRoot(), // Initialize the ConfigModule
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Import the ConfigModule
      useFactory: async (configService: ConfigService) => ({
        type: "mariadb",
        host: configService.get("DB_HOST"),
        port: +configService.get<number>("DB_PORT"),
        username: configService.get("DB_USERNAME"),
        password: configService.get("DB_PASSWORD"),
        database: configService.get("DB_DATABASE"),
        entities: [User, Genre, Film, Comment],
        synchronize: true,
      }),
      inject: [ConfigService],
    }), ElasticsearchModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
