import { Test, TestingModule } from '@nestjs/testing';
import { HttpResService } from './http-res.service';

describe('HttpResService', () => {
  let service: HttpResService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HttpResService],
    }).compile();

    service = module.get<HttpResService>(HttpResService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
