import { Body, Get, HttpStatus, Res } from '@nestjs/common';
import { Controller, Param, Put } from '@nestjs/common';
import { Response } from 'express';
import {
  CampusMap,
  PUT_MAP_RESPONSE_BODY_INVALID,
  ShortestPathError,
  ShortestPathWrapper,
} from './domain';
import { MapService } from './map.service';

@Controller('maps')
export class MapController {
  constructor(private readonly mapService: MapService) {}

  //[API] Add or update a map: PUT /maps/{mapId}
  @Put('/:mapId')
  putMap(
    @Param('mapId') mapId: string,
    @Body() campusMap: CampusMap,
    @Res() res: Response,
  ) {
    const isMapValid: boolean = this.mapService.setMap(mapId, campusMap);
    if (isMapValid) {
      res.status(HttpStatus.NO_CONTENT).send();
    } else {
      res.status(HttpStatus.BAD_REQUEST).json(PUT_MAP_RESPONSE_BODY_INVALID);
    }
  }

  //GET /maps/{mapId}/path/{startId}/{endId}
  @Get('/:mapId/path/:startId/:endId')
  getShortestPath(
    @Param('mapId') mapId: string,
    @Param('startId') startId: string,
    @Param('endId') endId: string,
    @Res() res: Response,
  ): any {
    const buildingShortestPath: ShortestPathWrapper = this.mapService.getShortestPath(
      mapId,
      startId,
      endId,
    );
    if (buildingShortestPath.shortestPath) {
      res.status(HttpStatus.OK).json(buildingShortestPath);
    } else if (buildingShortestPath.errorMessage && buildingShortestPath.code) {
      const errorResponse: ShortestPathError = {
        message: buildingShortestPath.errorMessage,
      };
      res.status(buildingShortestPath.code).json(errorResponse);
    }
  }
}
