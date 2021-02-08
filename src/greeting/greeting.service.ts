import { Injectable } from '@nestjs/common';

@Injectable()
export class GreetingService {
  getGreeting(name: string): string {
    return `Hello ${name}!`;
  }
}
