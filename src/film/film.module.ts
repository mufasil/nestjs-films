import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Film } from "../entities/film.entity";
import { Genre } from "../entities/genre.entity";
import { FilmService } from "./film.service";
import { FilmController } from "./film.controller";
import { Comment } from "src/entities/comment.entity";
import { ElasticsearchService } from "src/elasticsearch/elasticsearch.service";
import { EventsService } from "src/shared/events.service";
import { EleasticSyncService } from "src/elasticsearch/eleastic-sync.service";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [TypeOrmModule.forFeature([Film, Genre, Comment])],
  providers: [
    FilmService,
    ElasticsearchService,
    EventsService,
    EleasticSyncService,
    EventEmitter2,
    ConfigService,
    JwtModule,
  ],
  controllers: [FilmController],
})
export class FilmModule {}
