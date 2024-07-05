import { Injectable } from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from './schemas/request.schema';
import { Model } from 'mongoose';

@Injectable()
export class RequestService {
  constructor(
    @InjectModel(Request.name) private userRequestModel: Model<Request>,
  ) {}

  async create(createRequestDto: CreateRequestDto) {
    const newRequest = await new this.userRequestModel(createRequestDto);

    return await newRequest.save();
  }

  async findAll() {
    return this.userRequestModel.find().exec();
  }

  async findOne(id: string) {
    return await this.userRequestModel.findById(id);
  }

  async findByUserId(userId: string) {
    return await this.userRequestModel.findOne({ user: userId });
  }

  async update(id: string, updateRequestDto: UpdateRequestDto) {
    return await this.userRequestModel.findByIdAndUpdate(id, updateRequestDto, {
      new: true,
      runValidators: true,
    });
  }

  async remove(id: string) {
    return await this.userRequestModel.findByIdAndDelete(id);
  }
}
