import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GreetingModule } from './greeting/greeting.module';
import { MapModule } from './map/map.module';
@Module({
  imports: [GreetingModule, MapModule],
  controllers: [AppController],
  providers: [AppService, Map],
})
export class AppModule {}
