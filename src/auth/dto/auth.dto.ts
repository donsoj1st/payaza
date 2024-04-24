import { IsNotEmpty, IsString } from 'class-validator';

export class optDto {
  @IsString()
  @IsNotEmpty()
  otp: string;
}
