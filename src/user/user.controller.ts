import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { userDto } from './dto/user.dto';
import { ApiTags } from '@nestjs/swagger';

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
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<any> {
    return await this.userService.findOne(id);
  }
}
