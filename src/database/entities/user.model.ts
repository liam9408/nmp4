import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsToMany,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { Tenant } from './tenant.model'; // Import the Tenant model if you have one
import { Role } from './role.model';
import { UserRole } from './userRole.model';
import { Assignment } from './assignment.model';

@Table({
  modelName: 'user',
  tableName: 'tb_user',
  timestamps: false,
  underscored: true,
})
export class User extends Model {
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
  email: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  first_name: string;

  @Column({
    type: DataType.STRING(40),
    allowNull: true,
  })
  last_ip: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  last_name: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  password: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  status: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  verification_code: string;

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

  @ForeignKey(() => Tenant)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  tenant_id: number;

  @BelongsTo(() => Tenant)
  tenant: Tenant;

  @BelongsToMany(() => Role, () => UserRole)
  roles: Role[];

  @HasMany(() => Assignment)
  assignments: Assignment[];

  getRoles: () => Role[];

  getTenant: () => Tenant;
}
