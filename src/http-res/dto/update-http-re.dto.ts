import { PartialType } from '@nestjs/swagger';
import { CreateHttpReDto } from './create-http-re.dto';

export class UpdateHttpReDto extends PartialType(CreateHttpReDto) {}
