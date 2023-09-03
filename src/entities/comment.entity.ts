import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Film } from "./film.entity";
import { Max, Min } from "class-validator";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  user_id: number;

  @ManyToOne(() => Film, (film) => film.comments)
  film: Film;

  @Column({ type: "int", nullable: true, default: null })
  @Min(1)
  @Max(5)
  rating: number | null;
}
