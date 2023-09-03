import { Injectable } from "@nestjs/common";
import { EventsService } from "../shared/events.service"; // Import the events service
import { ElasticsearchService } from "./elasticsearch.service";
import { Film } from "src/entities/film.entity";

@Injectable()
export class EleasticSyncService {
  constructor(
    private readonly eventsService: EventsService,
    private readonly elasticsearchService: ElasticsearchService
  ) {
    const emitter = this.eventsService.getEmitter();
    // Listen to film created events
    emitter.on("film.created", async (film: Film) => {
      await this.elasticsearchService.indexFilm(film);
    });

    // Listen to film updated events
    emitter.on("film.updated", async (film: Film) => {
      await this.elasticsearchService.updateFilm(film);
    });

    // Listen to film deleted events
    emitter.on("film.deleted", async (filmId: number) => {
      await this.elasticsearchService.deleteFilm(filmId);
    });
  }
}
