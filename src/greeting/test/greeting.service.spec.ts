import { Test, TestingModule } from '@nestjs/testing';
import { GreetingService } from '../greeting.service';

describe('Greeting', () => {
  let provider: GreetingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GreetingService],
    }).compile();

    provider = module.get<GreetingService>(GreetingService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  describe('getGreeting', () => {
    it('should return greeting for specified user', () => {
      expect(provider.getGreeting('Henry')).toEqual('Hello Henry!');
    });
  });
});
