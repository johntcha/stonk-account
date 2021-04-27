import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.getUserByUsername(username);
    const isPasswordMatching = await bcrypt.compare(
        pass,
        user.password
      );
    if (user && isPasswordMatching) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    const expiration = new Date() 
    const test = Math.floor(expiration.setSeconds(expiration.getSeconds() + 2*60)/1000)
    return {
      access_token: this.jwtService.sign(payload),
      token_expiration: test
    };
  }
}