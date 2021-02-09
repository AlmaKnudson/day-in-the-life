import { HttpStatus, Injectable } from '@nestjs/common';
import { DijkstraService } from '../dijkstra/dijkstra.service';
import { BuildingShortestPath, CampusMap, ShortestPathWrapper } from './domain';

@Injectable()
export class MapService {
  constructor(private readonly dijkstraService: DijkstraService) {}
  private campusMaps: Map<string, CampusMap> = new Map<string, CampusMap>();

  private isValid(map: CampusMap) {
    return Object.keys(map).length > 0; // Can add additional valid rules here and extract into a validation pipe if we want to get fancy
  }

  private areKeysInObject(buildings: any, buildingId: string): boolean {
    return Object.keys(buildings).includes(buildingId);
  }

  setMap(mapId: string, map: CampusMap): boolean {
    if (this.isValid(map)) {
      this.campusMaps.set(mapId, map);
      return true;
    } else {
      return false;
    }
  }

  getShortestPath(
    mapId: string,
    startId: string,
    endId: string,
  ): ShortestPathWrapper {
    if (this.campusMaps.has(mapId)) {
      const campusMap: CampusMap = this.campusMaps.get(mapId) as CampusMap;
      if (!this.areKeysInObject(campusMap.buildings, startId)) {
        return {
          errorMessage: `Building '${startId}' is unknown.`,
          code: HttpStatus.BAD_REQUEST,
        };
      } else if (!this.areKeysInObject(campusMap.buildings, endId)) {
        return {
          errorMessage: `Building '${endId}' is unknown.`,
          code: HttpStatus.BAD_REQUEST,
        };
      }
      const costPath = this.dijkstraService.dijkstra(
        campusMap.buildings,
        startId,
        endId,
      );
      //`There is no path between '${startId}' and '${endId}'.`
      if (costPath.path == null) {
        return {
          errorMessage: `There is no path between '${startId}' and '${endId}'.`,
          code: HttpStatus.BAD_REQUEST,
        };
      }
      return { shortestPath: { distance: costPath.cost, path: costPath.path } };
    } else {
      //A Map with the given MapID does not exist...
      //Might want to throw an exception
      return {
        errorMessage: `Map '${mapId}' is unknown`,
        code: HttpStatus.NOT_FOUND,
      };
    }
  }
}
