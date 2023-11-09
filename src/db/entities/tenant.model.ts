import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  HasMany,
} from 'sequelize-typescript';
import { User } from './user.model'; // Import the User model if you have one

@Table({
  modelName: 'tenant',
  tableName: 'tenant',
  timestamps: false,
  underscored: true,
})
export class Tenant extends Model {
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
    type: DataType.STRING(10),
    allowNull: true,
  })
  binding_code: string;

  @Column({
    type: DataType.STRING(150),
    allowNull: true,
  })
  domain_name: string;

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

  @HasMany(() => User)
  users: User[];
}
