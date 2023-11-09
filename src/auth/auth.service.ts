import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';

import { User } from 'src/db/entities/user.model';
import { TokenData } from './auth.interface';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  async findOne(id: string): Promise<User> {
    return this.usersService.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }

  public static createJwtToken(
    dataStoredInToken: any,
    // Set session expiration to x days.
    expiresIn = 60 * 60 * 24 * 365 * 100,
  ): TokenData {
    const secret: string = process.env.JWT_SECRET;
    // const expiresIn: number = 60 * 60;
    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secret, {
        expiresIn,
      }),
    };
  }
}

// eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTY5OTQ1MzY3NiwiZXhwIjo0ODUzMDUzNjc2fQ.9H9zQ8Ku1Yda2yEAPwlR1iysxn5e4HIY7lY1wzmBlFvWzBK_JYDmP8KcowqJmXw5JVi18wNyvVma75cERpXwDw

// eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzIiwiaWF0IjoxNjk5NDUxNzQ4LCJleHAiOjE2OTk2MjQ1NDh9.bjQn6URVLWYJyZmHFNey8h7E2SMIVqMbv3HLl4JkFddh_oRmUtoirNwLZ1YKt2GLqgQfFL4l_03AMmSwC8X1vw
