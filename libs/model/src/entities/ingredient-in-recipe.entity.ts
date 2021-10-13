import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class IngredientInRecipe {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: string;
}
