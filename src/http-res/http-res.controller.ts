import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HttpResService } from './http-res.service';
import { CreateHttpReDto } from './dto/create-http-re.dto';
import { UpdateHttpReDto } from './dto/update-http-re.dto';

@Controller('http-res')
export class HttpResController {
  constructor(private readonly httpResService: HttpResService) {}

  @Post()
  create(@Body() createHttpReDto: CreateHttpReDto) {
    return this.httpResService.create(createHttpReDto);
  }

  @Get()
  getAccountDetails(@Body() number: any) {
    const { id } = number;
    return this.httpResService.getAccountDetails(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHttpReDto: UpdateHttpReDto) {
    return;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return;
  }
}
