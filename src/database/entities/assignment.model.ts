import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from './user.model';
import { Scenario } from './scenario.model';

@Table({
  modelName: 'assignment',
  tableName: 'assignment',
  timestamps: false,
  underscored: true,
})
export class Assignment extends Model {
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

  @ForeignKey(() => Scenario)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  scenario_id: number;

  @BelongsTo(() => Scenario)
  scenario: Scenario;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  user_id: number;

  @BelongsTo(() => User)
  user: User;
}
