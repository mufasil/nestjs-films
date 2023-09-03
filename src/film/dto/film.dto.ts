import {
  IsString,
  IsDate,
  IsNumber,
  IsDecimal,
  IsOptional,
  IsInt,
  Min,
  Max,
} from "class-validator";

export class CreateFilmDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsDate()
  release_date: Date;

  @IsDecimal({ decimal_digits: "2" })
  ticket_price: number;

  @IsString()
  country: string;

  @IsOptional()
  @IsString({ each: true })
  genres: string[];

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;
}

export class UpdateFilmDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsDate()
  release_date: Date;

  @IsOptional()
  @IsDecimal({ decimal_digits: "2" })
  ticket_price: number;

  @IsOptional()
  @IsString()
  country: string;

  @IsOptional()
  @IsString({ each: true })
  genres: string[];

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;
}
