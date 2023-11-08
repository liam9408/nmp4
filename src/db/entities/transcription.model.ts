import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({
  modelName: 'transcription',
  tableName: 'transcription',
  timestamps: false, // Since there are no 'created' and 'modified' columns
  underscored: true,
})
export class Transcription extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  api_time_taken: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  emotion: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  emotion1: string;

  @Column({
    type: DataType.DOUBLE,
    allowNull: true,
  })
  emotion1score: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  emotion2: string;

  @Column({
    type: DataType.DOUBLE,
    allowNull: true,
  })
  emotion2score: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  emotion3: string;

  @Column({
    type: DataType.DOUBLE,
    allowNull: true,
  })
  emotion3score: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  emotion4: string;

  @Column({
    type: DataType.DOUBLE,
    allowNull: true,
  })
  emotion4score: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  name: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  sentiment: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: true,
  })
  start_time: string;

  @Column({
    type: DataType.STRING(1000),
    allowNull: true,
  })
  summary_words: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  transcript: string;

  @Column({
    type: DataType.DOUBLE,
    allowNull: true,
  })
  valence_score: number;
}
