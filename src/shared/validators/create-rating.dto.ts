import { IsNumber, IsNotEmpty, IsString } from 'class-validator';

export class CreateRatingDto {
  @IsNumber()
  @IsNotEmpty()
  rating: number;

  @IsNumber()
  @IsNotEmpty()
  filmId: number;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
