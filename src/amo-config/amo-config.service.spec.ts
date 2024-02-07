import { Test, TestingModule } from '@nestjs/testing';
import { AmoConfigService } from './amo-config.service';

describe('AmoConfigService', () => {
  let service: AmoConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AmoConfigService],
    }).compile();

    service = module.get<AmoConfigService>(AmoConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
