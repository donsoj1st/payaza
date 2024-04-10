import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { userDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async SignUp(userDto: userDto): Promise<any> {
    //change the user email to lowercase for uniformity
    userDto.email = userDto.email.toLocaleLowerCase();

    //check if user exist
    const userExist = await this.userModel.findOne({
      email: userDto.email.toLocaleLowerCase(),
    });
    console.log(userExist);
    if (userExist) throw new BadRequestException('User already exists');

    userDto.password = await bcrypt.hash(userDto.password, 10);

    const NewUser = new this.userModel(userDto);
    return NewUser;
  }
}
