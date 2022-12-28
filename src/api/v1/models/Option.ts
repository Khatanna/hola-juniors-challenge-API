import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import Question from "./Question";

@Table({ timestamps: false })
export default class Option extends Model {
  @Column
  key!: string;

  @Column
  description!: string;

  @ForeignKey(() => Question)
  @Column({ field: "question_id" })
  questionId!: number;

  @BelongsTo(() => Question)
  question!: Question;
}
