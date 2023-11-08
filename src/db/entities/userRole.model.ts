import {
  DataType,
  Column,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from './user.model'; // Import the User model if you have one
import { Role } from './role.model'; // Import the Role model if you have one

@Table({
  modelName: 'user_role',
  tableName: 'user_role',
  timestamps: false, // Since there are no 'created' and 'modified' columns
  underscored: true,
})
export class UserRole extends Model {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id: number;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  role_id: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Role)
  role: Role;
}
