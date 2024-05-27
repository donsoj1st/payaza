import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.userService.findUserByEmail(username);
    const checkPassword = await bcrypt.compare(pass, user.password);
    if (!checkPassword) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user._Id, username: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async validateUser(username, pass) {
    const user = await this.userService.findUserByEmail(username);
    if (!user) {
      return null;
    }
    const checkPassword = await bcrypt.compare(pass, user.password);
    console.log('check password: ', checkPassword);
    if (!checkPassword) {
      return null;
    }
    if (checkPassword) {
      const { password, ...result } = user;
      return result;
    }
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async verifyotp(otp: string) {
    return await this.userService.verifyUser(otp);
  }
}
