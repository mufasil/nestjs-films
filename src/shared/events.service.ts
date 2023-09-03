import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { Film } from "src/entities/film.entity";

@Injectable()
export class EventsService {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  getEmitter() {
    return this.eventEmitter;
  }

  filmCreated(film: Film) {
    this.eventEmitter.emit("film.created", film);
  }

  filmUpdated(film: Film) {
    this.eventEmitter.emit("film.updated", film);
  }

  filmDeleted(filmId: number) {
    this.eventEmitter.emit("film.deleted", filmId);
  }
}
