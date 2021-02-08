import { Param, UsePipes } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { string } from 'joi';
import { AppService } from './app.service';
import { CapitalizationPipe } from './pipes/capitalization.pipe';
import { JoiValidationPipe } from './pipes/joi-validation.pipe';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
