import { Module } from "@nestjs/common";
import { ElasticsearchService } from "./elasticsearch.service";
import { EleasticSyncService } from "./eleastic-sync.service";
import { EventsService } from "src/shared/events.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Film } from "src/entities/film.entity";
import { Genre } from "src/entities/genre.entity";
import { Comment } from "src/entities/comment.entity";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { ConfigService } from "@nestjs/config";

@Module({
  imports: [TypeOrmModule.forFeature([Film, Genre, Comment])],
  providers: [
    ElasticsearchService,
    EleasticSyncService,
    EventsService,
    EventEmitter2,
    ConfigService,
  ],
})
export class ElasticsearchModule {}
