import {
  Table,
  Column,
  Model,
  HasMany,
  PrimaryKey,
  AutoIncrement,
} from "sequelize-typescript";
import Option from "./Option";

@Table({ timestamps: false })
export default class Question extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @Column
  question!: string;

  @Column({ field: "correct_answer" })
  correctAnswer!: string;

  @HasMany(() => Option)
  options!: Option[];
}
