import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  isString,
} from 'class-validator';

export enum role {
  admin = 'admin',
  vendor = 'vendor',
  client = 'client',
}
export class userDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  first_name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  last_name: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  phone_number: number;

  @IsEnum(role)
  @IsNotEmpty()
  role: role;
}
