import { Column, Model, Table } from 'sequelize-typescript';

@Table({
  modelName: 'student',
  tableName: 'students',
  underscored: true,
  timestamps: true,
})
export class Student extends Model {
  @Column
  first_name: string;

  @Column
  last_name: string;
}
