import { Test, TestingModule } from '@nestjs/testing';
import { DijkstraModule } from 'src/dijkstra/dijkstra.module';
import { MapController } from '../map.controller';
import { MapService } from '../map.service';

describe('MapController', () => {
  let controller: MapController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DijkstraModule],
      providers: [MapService],
      controllers: [MapController],
    }).compile();

    controller = module.get<MapController>(MapController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
