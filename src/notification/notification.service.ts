import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { InjectModel } from '@nestjs/mongoose';
import { notifications } from './schemas/notification.schema';
import { Model } from 'mongoose';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(notifications.name) private notification: Model<notifications>,
  ) {}
  create(createNotificationDto: CreateNotificationDto) {
    return 'This action adds a new notification';
  }

  findAll() {
    return `This action returns all notification`;
  }

  findOne(id: string) {
    return `This action returns a #${id} notification`;
  }

  update(id: string, updateNotificationDto: UpdateNotificationDto) {
    return `This action updates a #${id} notification`;
  }

  remove(id: string) {
    return `This action removes a #${id} notification`;
  }
}
