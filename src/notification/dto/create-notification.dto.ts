import { User } from 'src/user/schemas/user.schema';

export class CreateNotificationDto {
  user: User;

  title: string;

  message: string;

  type: string;

  read: boolean;
}
