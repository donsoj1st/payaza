import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  notifications,
  notificationsSchema,
} from './schemas/notification.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: notifications.name, schema: notificationsSchema },
    ]),
  ],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
