import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from './user.model'; // Import the User model if you have one
import { Module } from './module.model'; // Import the Module model if you have one

@Table({
  modelName: 'scenario',
  tableName: 'scenario',
  timestamps: false,
  underscored: true,
})
export class Scenario extends Model {
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
    type: DataType.STRING(20),
    allowNull: true,
  })
  lang: string;

  @Column({
    type: DataType.STRING(150),
    allowNull: true,
  })
  name: string;

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

  @ForeignKey(() => Module)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  module_id: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
  })
  assessment: boolean;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  assessment_scenario: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
  })
  published: boolean;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  type: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  introduction_url: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  quiz_image_url: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  user_scenario_value: string;
}
