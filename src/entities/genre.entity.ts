import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from "typeorm";
import { Film } from "./film.entity";

@Entity()
export class Genre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @ManyToMany(() => Film, (film) => film.genres)
  films: Film[];
}
