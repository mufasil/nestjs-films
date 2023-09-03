import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, In } from "typeorm";
import { Film } from "../entities/film.entity";
import { Genre } from "../entities/genre.entity";
import { CreateFilmDto, UpdateFilmDto } from "./dto/film.dto";
import { Comment } from "src/entities/comment.entity";
import { CreateCommentDto } from "./dto/comment.dto";
import { ElasticsearchService } from "src/elasticsearch/elasticsearch.service";
import { EventsService } from "src/shared/events.service";

@Injectable()
export class FilmService {
  constructor(
    @InjectRepository(Film)
    private readonly filmRepository: Repository<Film>,
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly elasticsearchService: ElasticsearchService,
    private readonly eventsService: EventsService
  ) {}

  async createFilm(createFilmDto: CreateFilmDto): Promise<Film> {
    const { genres, ...filmData } = createFilmDto;

    const film = this.filmRepository.create(filmData);

    if (genres && genres.length > 0) {
      const genreEntities = await this.genreRepository.find({
        where: { id: In(genres) },
      });
      film.genres = genreEntities;
    }

    await this.filmRepository.save(film);
    // Emit a film created event
    this.eventsService.filmCreated(film);

    return film;
  }

  async updateFilm(id: number, updateFilmDto: UpdateFilmDto): Promise<Film> {
    const film = await this.filmRepository.findOne({ where: { id } });

    if (!film) {
      throw new NotFoundException("Film not found");
    }

    const { genres, ...filmData } = updateFilmDto;

    this.filmRepository.merge(film, filmData);

    if (genres && genres.length > 0) {
      const genreEntities = await this.genreRepository.find({
        where: { id: In(genres) },
      });
      film.genres = genreEntities;
    } else {
      film.genres = [];
    }
    await this.filmRepository.save(film);
    // Emit a film updated event
    this.eventsService.filmUpdated(film);

    return film;
  }

  async getFilmById(id: number): Promise<Film> {
    const film = await this.filmRepository.findOne({
      where: { id },
      relations: ["genres"],
    });

    if (!film) {
      throw new NotFoundException("Film not found");
    }

    return film;
  }

  async deleteFilm(id: number): Promise<{ message: string }> {
    const film = await this.filmRepository.findOne({ where: { id } });

    if (!film) {
      throw new NotFoundException("Film not found");
    }

    await this.filmRepository.remove(film);

    return { message: "Film deleted successfully" };
  }

  async submitRating(id: number, rating: number): Promise<Film> {
    const film = await this.filmRepository.findOne({ where: { id } });

    if (!film) {
      throw new NotFoundException("Film not found");
    }

    // Ensure the rating is within the allowed range
    if (rating < 1 || rating > 5) {
      throw new BadRequestException(
        "Invalid rating. Rating must be between 1 and 5."
      );
    }

    // Update the film's rating
    film.rating = rating;

    // Save the updated film
    return this.filmRepository.save(film);
  }

  async createComment(
    id: number,
    createCommentDto: CreateCommentDto
  ): Promise<Comment> {
    const film = await this.filmRepository.findOne({ where: { id } });

    if (!film) {
      throw new NotFoundException("Film not found");
    }

    const comment = new Comment();
    comment.name = createCommentDto.name;
    comment.rating = createCommentDto.rating;
    comment.user_id = createCommentDto.user_id;
    comment.film = film;

    return this.commentRepository.save(comment);
  }

  async getCommentsForFilm(id: number): Promise<Comment[]> {
    const film = await this.filmRepository.findOne({
      where: { id },
      relations: ["comments"],
    });

    if (!film) {
      throw new NotFoundException("Film not found");
    }

    return film.comments;
  }
}
