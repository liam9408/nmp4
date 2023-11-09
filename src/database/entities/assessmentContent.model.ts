import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from './user.model'; // Import the User model if you have one
import { Answer } from './answer.model'; // Import the Answer model if you have one
import { Assessment } from './assessment.model'; // Import the Assessment model if you have one
import { Question } from './question.model'; // Import the Question model if you have one
import { Result } from './result.model'; // Import the Result model if you have one

@Table({
  modelName: 'assessment_content',
  tableName: 'assessment_content',
  timestamps: false,
  underscored: true,
})
export class AssessmentContent extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.DATE(6),
    allowNull: false,
  })
  created: Date;

  @Column({
    type: DataType.TINYINT,
    allowNull: true,
  })
  deleted: number;

  @Column({
    type: DataType.DATE(6),
    allowNull: true,
  })
  modified: Date;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  created_by_id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  modified_by_id: number;

  @ForeignKey(() => Answer)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  answer_id: number;

  @ForeignKey(() => Assessment)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  assessment_id: number;

  @ForeignKey(() => Question)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  question_id: number;

  @ForeignKey(() => Result)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  result_id: number;
}
