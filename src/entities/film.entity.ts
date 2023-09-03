import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from "typeorm";
import { Genre } from "./genre.entity";
import { Max, Min } from "class-validator";
import { Comment } from "./comment.entity";

@Entity()
export class Film {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: "date" })
  release_date: Date;

  @Column("double", { precision: 10, scale: 2 })
  ticket_price: number;

  @Column()
  country: String;

  @ManyToMany(() => Genre)
  @JoinTable()
  genres: Genre[];

  @Column({ type: "int", nullable: true, default: null })
  @Min(1)
  @Max(5)
  rating: number | null;

  @OneToMany(() => Comment, (comment) => comment.film)
  comments: Comment[];
}
