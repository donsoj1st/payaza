import { Module } from '@nestjs/common';
import { HttpResService } from './http-res.service';
import { HttpResController } from './http-res.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [HttpResController],
  providers: [HttpResService],
})
export class HttpResModule {}
