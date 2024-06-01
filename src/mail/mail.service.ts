import { Inject, Injectable } from '@nestjs/common';
import { MailDataRequired } from '@sendgrid/mail';
import * as SendGrid from '@sendgrid/mail';

@Injectable()
export class MailService {
  constructor(@Inject('SENDGRID') private readonly sgMail) {}

  async send(mail: MailDataRequired) {
    try {
      const transport = await SendGrid.send(mail);
    } catch (error) {
      return console.log(`Email error dispatched to ${error}`);
    }

    console.log(`Email successfully dispatched to ${mail.to}`);
    return mail;
  }
}
