import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from './user.model'; // Import the User model if you have one
import { Scenario } from './scenario.model'; // Import the Scenario model if you have one

@Table({
  modelName: 'question',
  tableName: 'question',
  timestamps: false,
  underscored: true,
})
export class Question extends Model {
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
    type: DataType.STRING(255),
    allowNull: true,
  })
  audio_file_url: string;

  @Column({
    type: DataType.TEXT('long'),
    allowNull: true,
  })
  content: string;

  @Column({
    type: DataType.TEXT('long'),
    allowNull: true,
  })
  hint: string;

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

  @ForeignKey(() => Scenario)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  scenario_id: number;

  @Column({
    type: DataType.TEXT('long'),
    allowNull: true,
  })
  ref_content: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  ref_audio_file_url: string;

  @Column({
    type: DataType.TINYINT,
    allowNull: true,
  })
  agent_speak_first: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  consistency: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  trainer_audio_file_url: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  customer_audio_file_url: string;
}
