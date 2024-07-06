import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { NotificationModule } from './notification/notification.module';
import { AuthModule } from './auth/auth.module';
import { RequestModule } from './request/request.module';
import { ApplicationModule } from './application/application.module';
import { PaymentModule } from './payment/payment.module';
import { MailModule } from './mail/mail.module';
import { HttpResModule } from './http-res/http-res.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    MongooseModule.forRoot(process.env.MONGO_URI),
    NotificationModule,
    AuthModule,
    RequestModule,
    ApplicationModule,
    PaymentModule,
    MailModule,
    HttpResModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
