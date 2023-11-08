import {
  Get,
  Post,
  Param,
  Controller,
  Body,
  UnauthorizedException,
} from '@nestjs/common';

import { User } from 'src/db/entities/user.model';
import { SignInDto } from './dto/sign-in.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { TokenData } from './auth.interface';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: UsersService) {}

  @Post('/signin')
  async findAll(
    @Body() signInDto: SignInDto,
  ): Promise<{ token: TokenData; user: User }> {
    const user = await this.authService.findOne({
      where: {
        email: signInDto.email,
      },
    });
    if (!user) throw new UnauthorizedException();

    const isPasswordMatching: boolean = await bcrypt.compare(
      signInDto.password,
      user.password,
    );
    if (!isPasswordMatching) throw new UnauthorizedException();

    const token = AuthService.createJwtToken({ userId: user.id });

    return { token, user };
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.authService.findOne({});
  }
}
