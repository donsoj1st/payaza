import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
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
    if (!checkPassword) {
      return null;
    }
    if (checkPassword) {
      const { password, ...result } = user;
      return result['_doc'];
    }
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user._id };

    const tokens = await this.getTokens(user._id, user.email);
    const hashRefreshToken = await bcrypt.hash(tokens.refreshToken, 12); // hash the refesh token
    console.log(hashRefreshToken);
    await this.userService.update(user._id, { refreshToken: hashRefreshToken });
    return {
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
    };
  }

  async logout(userId: string) {
    return await this.userService.update(userId, { refreshToken: null });
  }

  async verifyotp(otp: string) {
    return await this.userService.verifyUser(otp);
  }

  async getTokens(userId: string, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.userService.findOne(userId);
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');
    const refreshTokenMatches = await bcrypt.compare(
      refreshToken,
      user.refreshToken,
    );
    console.log(refreshTokenMatches);
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied 2');
    const tokens = await this.getTokens(userId, user.email);
    const hashRefreshToken = await bcrypt.hash(tokens.refreshToken, 12); // hash the refesh token
    console.log(hashRefreshToken);
    await this.userService.update(userId, { refreshToken: hashRefreshToken });
    return tokens;
  }
}
