import { Controller, Get, Logger, Param, UsePipes } from '@nestjs/common';
import { string } from 'joi';
import { CapitalizationPipe } from '../pipes/capitalization.pipe';
import { JoiValidationPipe } from 'src/pipes/joi-validation.pipe';
import { GreetingService } from './greeting.service';

@Controller('greeting')
export class GreetingController {
  constructor(private readonly greetingService: GreetingService) {}

  @Get(':name')
  @UsePipes(new JoiValidationPipe(string().min(2).max(5)))
  getGreeting(@Param('name', CapitalizationPipe) name: string) {
    Logger.log(`getGreeting called with name: ${name}.`);
    return this.greetingService.getGreeting(name);
  }
}
