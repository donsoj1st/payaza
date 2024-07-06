import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

export type UserDocument = HydratedDocument<Request>;

@Schema({ timestamps: true })
export class Request {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({})
  title: string;

  @Prop({})
  companyName: string;

  @Prop({})
  workType: string;

  @Prop({})
  jobLocation: string;

  @Prop({})
  jobType: string;

  @Prop({})
  gender: string;

  @Prop({})
  education: string;

  @Prop({})
  Qualification: string;

  @Prop({})
  employeeLocation: string;

  @Prop([{ type: String, default: [] }])
  skills: string[];

  @Prop({ default: null })
  yearOfExperience: number;

  @Prop({})
  jobDescription: string;
}

export const RequestSchema = SchemaFactory.createForClass(Request);
