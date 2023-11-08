import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from './user.model'; // Import the User model if you have one
import { Question } from './question.model'; // Import the Question model if you have one
import { Result } from './result.model'; // Import the Result model if you have one

@Table({
  modelName: 'answer',
  tableName: 'answer',
  timestamps: false,
  underscored: true,
})
export class Answer extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.DATE(6),
    allowNull: true,
  })
  created: Date;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  deleted: number;

  @Column({
    type: DataType.DATE(6),
    allowNull: true,
  })
  modified: Date;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  audio_file_url: string;

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
