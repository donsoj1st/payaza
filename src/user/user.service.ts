import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { userDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import generateOTP from 'src/util/otp-generator';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private mailService: MailService,
  ) {}

  async SignUp(userDto: userDto): Promise<any> {
    //change the user email to lowercase for uniformity
    userDto.email = userDto.email.toLocaleLowerCase();

    //check if user exist
    const userExist = await this.userModel.findOne({
      email: userDto.email.toLocaleLowerCase(),
    });
    if (userExist) throw new BadRequestException('User already exists');

    userDto.password = await bcrypt.hash(userDto.password, 10);

    let otp = generateOTP();

    // this will check if the opt exist.
    while (await this.findOtp(otp)) {
      console.log(otp);
      otp = generateOTP();
    }
    const NewUser = new this.userModel({ ...userDto, otp });
    await NewUser.save();

    //email will be dispatch.
    // Send email to user
    await this.mailService.send({
      from: {
        email: 'donsoj1st@gmail.com',
        name: 'donsoj1st',
      },
      personalizations: [
        {
          to: [
            {
              email: NewUser.email,
            },
          ],
          dynamicTemplateData: {
            otp,
          },
        },
      ],
      templateId: 'd-ba498c28febe4a47abde42bfe824b529',
    });

    console.log(NewUser.email);

    return NewUser;
  }
  async findAll() {
    return this.userModel.find().exec();
  }

  async findUserByEmail(email: string): Promise<any> {
    console.log('details: ', email);
    return await this.userModel.findOne({ email: email.toLowerCase() });
  }
  async findOne(id: string) {
    return await this.userModel.findById(id);
  }

  update(id: string) {
    return `This action updates a #${id} notification`;
  }

  remove(id: string) {
    return `This action removes a #${id} notification`;
  }

  async findOtp(opt: string) {
    return await this.userModel.findOne({ opt });
  }

  async verifyUser(otp: string) {
    try {
      console.log(otp);
      const user = await this.userModel.findOne({ otp });
      user.verify = true;
      user.otp = null;
      await user.save();
      return true;
    } catch (error) {
      return { error, message: 'unable to verify user' };
    }
  }
}
