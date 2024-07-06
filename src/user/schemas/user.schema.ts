import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { role } from '../dto/user.dto';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  first_name: string;

  @Prop({ required: true })
  last_name: string;

  @Prop({ required: true })
  phone_number: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: role })
  role: string;

  @Prop({ default: null })
  otp: string;

  @Prop({ default: null })
  dateOfBirth: Date;

  @Prop({ default: false })
  verify: boolean;

  @Prop({})
  refreshToken: string;

  @Prop({ default: null })
  officeTitle: string;

  @Prop({ default: null })
  dessignation: string;

  @Prop({ default: null })
  companyName: string;

  @Prop({ default: null })
  numberOfEmployee: string;

  @Prop({ default: null })
  companyWebsite: string;

  @Prop({ default: null })
  Country: string;

  @Prop({ default: null })
  state: string;

  @Prop({ default: null })
  city: string;

  @Prop({ default: null })
  profile: string;

  @Prop({ default: null })
  documents: string;

  @Prop([{ type: String }])
  skills: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
