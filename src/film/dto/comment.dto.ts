import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsOptional,
  Min,
  Max,
} from "class-validator";
export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  user_id: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;
}
