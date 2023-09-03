import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Patch,
  Delete,
} from "@nestjs/common";
import { FilmService } from "./film.service";
import { CreateFilmDto, UpdateFilmDto } from "./dto/film.dto";
import { CreateCommentDto } from "./dto/comment.dto";

@Controller("films")
export class FilmController {
  constructor(private readonly filmService: FilmService) {}

  // Create a new film
  @Post()
  createFilm(@Body() createFilmDto: CreateFilmDto) {
    return this.filmService.createFilm(createFilmDto);
  }

  // Retrieve a film by ID
  @Get(":id")
  getFilmById(@Param("id") id: number) {
    return this.filmService.getFilmById(id);
  }

  // Update a film by ID
  @Patch(":id")
  updateFilm(@Param("id") id: number, @Body() updateFilmDto: UpdateFilmDto) {
    return this.filmService.updateFilm(id, updateFilmDto);
  }

  // Delete a film by ID
  @Delete(":id")
  deleteFilm(@Param("id") id: number) {
    return this.filmService.deleteFilm(id);
  }

  // Add Rating
  @Patch(":id/rating")
  submitRating(@Param("id") id: number, @Body() updateFilmDto: UpdateFilmDto) {
    return this.filmService.submitRating(id, updateFilmDto.rating);
  }

  // Create a comment for a film
  @Post(":id/comments")
  createComment(
    @Param("id") id: number,
    @Body() createCommentDto: CreateCommentDto
  ) {
    return this.filmService.createComment(id, createCommentDto);
  }

  // Retrieve all comments for a film
  @Get(":id/comments")
  getCommentsForFilm(@Param("id") id: number) {
    return this.filmService.getCommentsForFilm(id);
  }
}
