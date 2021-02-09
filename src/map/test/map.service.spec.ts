import { Test, TestingModule } from '@nestjs/testing';
import { DijkstraModule } from '../../dijkstra/dijkstra.module';
import { CampusMap } from '../domain';
import { MapService } from '../map.service';

describe('MapService', () => {
  let provider: MapService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DijkstraModule],
      providers: [MapService],
    }).compile();

    provider = module.get<MapService>(MapService);
  });

  const campusMap: CampusMap = {
    buildings: {
      a: {
        b: 1.1,
        c: 0.5,
      },
      b: {
        a: 2,
        c: 0.3,
      },
      c: {
        a: 0.2,
        b: 0.2,
      },
    },
  };
  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
  describe('setMap', () => {
    it('should return true, when map is valid', () => {
      expect(provider.setMap('berkley', campusMap)).toBeTruthy();
    });

    it('should return false, when map is not valid', () => {
      const campusMap: CampusMap = {} as CampusMap;
      expect(provider.setMap('berkley', campusMap)).toBeFalsy();
    });
  });

  describe('getShortestPath', () => {
    it('should return shortest path response body', () => {
      const mapId = 'bellevue';
      provider.setMap(mapId, campusMap);
      const shortestPath = provider.getShortestPath(mapId, 'a', 'c');
      expect(shortestPath).toEqual({
        shortestPath: { distance: 0.5, path: ['a', 'c'] },
      });
    });

    it('should return building is unknown response body', () => {
      const mapId = 'bellevue';
      provider.setMap(mapId, campusMap);
      const shortestPath = provider.getShortestPath(mapId, 'a', 'x');
      expect(shortestPath).toEqual({
        code: 400,
        errorMessage: `Building 'x' is unknown.`,
      });
    });
  });
});
