import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

export type notificationsDocument = notifications & Document;

@Schema({ timestamps: true })
export class notifications {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  message: string;

  @Prop({ required: true })
  type: string;

  @Prop({ default: false })
  read: boolean;
}

export const notificationsSchema = SchemaFactory.createForClass(notifications);
