import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({
  modelName: 'student',
  tableName: 'students',
  timestamps: false,
  underscored: true,
})
export class Student extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  first_name: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  last_name: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  created_at: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  updated_at: Date;
}
