import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { RoleModule } from 'src/role/role.module';
import { UserRolesModule } from 'src/user-roles/user-roles.module';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
    }),
    UsersModule,
    RoleModule,
    UserRolesModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [UsersModule, RoleModule, UserRolesModule],
})
export class AuthModule {}
