import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { userDto } from './dto/user.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateUserDto } from './dto/updateUser.dto';

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

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<any> {
    try {
      return await this.userService.update(id, updateUserDto);
    } catch (error) {
      return error;
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    try {
      await this.userService.remove(id);
      return { message: 'user remove sucessfully' };
    } catch (error) {
      console.log(error);
      return { message: 'Unable to delete user, Please try again', error };
    }
  }
}
