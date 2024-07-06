import { Injectable } from '@nestjs/common';
import { CreateHttpReDto } from './dto/create-http-re.dto';
import { UpdateHttpReDto } from './dto/update-http-re.dto';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class HttpResService {
  constructor(private httpService: HttpService) {}
  async create(datadto) {
    try {
      const config = {
        method: 'post',
        url: ` https://router-live.78financials.com/api/request/secure/payloadhandler`,
        headers: {
          Authorization: `Payaza ${process.env.payaza}`,
        },
        data: datadto,
      };
      const { data } = await this.httpService.axiosRef(config);
      return data;
    } catch (error) {
      return error;
    }
  }

  async getAccountDetails(AccountNumber: string) {
    //9629211105
    console.log(AccountNumber);
    const payload = {
      service_type: 'Account',
      service_payload: {
        request_application: 'Payaza',
        application_module: 'USER_MODULE',
        application_version: '1.0.0',
        request_class: 'GetAccountDetailsStaticAndDynamic',
        virtual_account_number: '9629211105',
      },
    };
    const config = {
      method: 'post',
      url: ` https://router-live.78financials.com/api/request/secure/payloadhandler`,
      headers: {
        Authorization: `Payaza UFo3OC1QS0xJVkUtMEUzRUVCRjYtQjU4Qi00REQyLTlDNzgtOTlEMUU2MTk0NUY4`,
      },
      data: payload,
    };
    const { data } = await this.httpService.axiosRef(config);
    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} httpRe`;
  }

  update(id: number, updateHttpReDto: UpdateHttpReDto) {
    return `This action updates a #${id} httpRe`;
  }

  remove(id: number) {
    return `This action removes a #${id} httpRe`;
  }
}
