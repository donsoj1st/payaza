import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [MailController],
  providers: [
    {
      provide: 'SENDGRID',
      useFactory: (configService: ConfigService) => {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(configService.get('SENDGRID_API_KEY'));
        return sgMail;
      },
      inject: [ConfigService],
    },
    MailService,
  ],
  exports: [MailService],
})
export class MailModule {}
