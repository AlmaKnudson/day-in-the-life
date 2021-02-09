import { Module } from '@nestjs/common';
import { DijkstraModule } from '../dijkstra/dijkstra.module';
import { MapController } from './map.controller';
import { MapService } from './map.service';

@Module({
  imports: [DijkstraModule],
  controllers: [MapController],
  providers: [MapService],
})
export class MapModule {}
