import { Injectable, NotFoundException } from "@nestjs/common";
import { Client } from "@elastic/elasticsearch";
import { Film } from "../entities/film.entity";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class ElasticsearchService {
  private readonly client: Client;

  constructor(protected readonly configService: ConfigService) {
    this.client = new Client({
      node: configService.get("ELASTIC_SEARCH_NODE_URL"),
    });
  }

  async indexFilm(film: Film) {
    const { id, ...filmData } = film;
    // await this.client.index({
    //   index: "films",
    //   id: id.toString(),
    //   body: filmData,
    // });
  }

  async updateFilm(film: Film) {
    const { id, ...filmData } = film;

    // await this.client.update({
    //   index: "films",
    //   id: id.toString(),
    //   body: { doc: filmData },
    // });
  }

  async deleteFilm(filmId: number) {
    // await this.client.delete({
    //   index: "films",
    //   id: filmId.toString(),
    // });
  }
}
