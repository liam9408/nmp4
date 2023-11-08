import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({
  modelName: 'userGroup',
  tableName: 'tb_user_group',
  timestamps: false,
  underscored: true,
})
export class YourModel extends Model {
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

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  created_by_id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  modified_by_id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  tenant_id: number;

  @Column({
    type: DataType.STRING(4),
    allowNull: true,
  })
  trainee_group: string;
}
