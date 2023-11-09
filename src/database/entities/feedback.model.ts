import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from './user.model'; // Import the User model if you have one
import { AssessmentContent } from './assessmentContent.model'; // Import the AssessmentContent model if you have one

@Table({
  modelName: 'feedback',
  tableName: 'feedback',
  timestamps: false,
  underscored: true,
})
export class Feedback extends Model {
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
    type: DataType.TEXT('long'),
    allowNull: true,
  })
  comment: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  reviewer: number;

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

  @ForeignKey(() => AssessmentContent)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  assessment_content_id: number;
}
