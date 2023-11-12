import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  HasMany,
} from 'sequelize-typescript';
import { User } from './user.model'; // Import the User model if you have one
import { Answer } from './answer.model'; // Import the Answer model if you have one

@Table({
  modelName: 'result',
  tableName: 'result',
  timestamps: false,
  underscored: true,
})
export class Result extends Model {
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

  @Column({
    type: DataType.TEXT('long'),
    allowNull: true,
  })
  hyp: string;

  @Column({
    type: DataType.STRING(10),
    allowNull: true,
  })
  intonation: string;

  @Column({
    type: DataType.STRING(10),
    allowNull: true,
  })
  pace: string;

  @Column({
    type: DataType.STRING(10),
    allowNull: true,
  })
  pronunciation: string;

  @Column({
    type: DataType.TEXT('long'),
    allowNull: true,
  })
  ref: string;

  @Column({
    type: DataType.STRING(10),
    allowNull: true,
  })
  rhythm: string;

  @Column({
    type: DataType.STRING(10),
    allowNull: true,
  })
  word_accuracy: string;

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

  // @ForeignKey(() => Answer)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  answer_id: number;

  @HasMany(() => Answer)
  answer: Answer;

  @Column({
    type: DataType.TEXT('long'),
    allowNull: true,
  })
  detected_text: string;

  @Column({
    type: DataType.TEXT('long'),
    allowNull: true,
  })
  prompt: string;

  @Column({
    type: DataType.TEXT('long'),
    allowNull: true,
  })
  general_audio: string;

  @Column({
    type: DataType.TEXT('long'),
    allowNull: true,
  })
  general_text: string;

  @Column({
    type: DataType.TEXT('long'),
    allowNull: true,
  })
  peel_audio: string;

  @Column({
    type: DataType.TEXT('long'),
    allowNull: true,
  })
  peel_text: string;

  @Column({
    type: DataType.TEXT('long'),
    allowNull: true,
  })
  suggest_audio: string;

  @Column({
    type: DataType.TEXT('long'),
    allowNull: true,
  })
  suggest_text: string;

  @Column({
    type: DataType.TEXT('long'),
    allowNull: true,
  })
  generated_text: string;
}
