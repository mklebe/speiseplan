import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Ingredient } from '.';

@Entity()
export class Recipe {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Ingredient)
}
