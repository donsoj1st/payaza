import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { userDto } from './dto/user.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async signUp(@Body() userData: userDto): Promise<any> {
    return this.userService.SignUp(userData);
  }
  @Get()
  async getUser(): Promise<any> {
    return await this.userService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @Get('current_user')
  async getCurrentUser(@Req() req: any): Promise<any> {
    try {
      return await this.userService.findOne(req.user.userId);
    } catch (error) {
      return error;
    }
  }
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<any> {
    return await this.userService.findOne(id);
  }
}
