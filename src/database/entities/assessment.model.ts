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
  modelName: 'assessment',
  tableName: 'assessment',
  timestamps: false,
  underscored: true,
})
export class Assessment extends Model {
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
    type: DataType.INTEGER,
    allowNull: true,
  })
  duration: number;

  @Column({
    type: DataType.DATE(6),
    allowNull: true,
  })
  end: Date;

  @Column({
    type: DataType.DATE(6),
    allowNull: true,
  })
  start: Date;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  status: number;

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

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  user_id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  feedback_status: number;
}
