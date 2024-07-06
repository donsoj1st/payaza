import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Request } from 'src/request/schemas/request.schema';
import { User } from 'src/user/schemas/user.schema';

export type applicationDocument = HydratedDocument<Application>;

@Schema({ timestamps: true })
export class Application {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Request' })
  request: Request;

  @Prop({})
  education: string;

  @Prop({})
  resume: string;

  @Prop({})
  experience: string;
}

export const applicationSchema = SchemaFactory.createForClass(Application);
