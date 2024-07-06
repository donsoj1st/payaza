import { PartialType } from '@nestjs/swagger';
import { role, userDto } from './user.dto';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateUserDto extends PartialType(userDto) {
  @IsString()
  @IsOptional()
  officeTitle: string;

  @IsString()
  @IsOptional()
  dessignation: string;

  @IsString()
  @IsOptional()
  companyName: string;

  @IsString()
  @IsOptional()
  numberOfEmployee: string;

  @IsString()
  @IsOptional()
  companyWebsite: string;

  @IsString()
  @IsOptional()
  Country: string;

  @IsString()
  @IsOptional()
  state: string;

  @IsString()
  @IsOptional()
  city: string;

  @IsString()
  @IsOptional()
  profile: string;

  @IsString()
  @IsOptional()
  documents: string;

  @IsOptional()
  skills: string[];

  @IsOptional()
  dateOfBirth: Date;
}
