import { HttpStatus } from '@nestjs/common';

export type CampusMap = {
  buildings: any;
};

export const PUT_MAP_RESPONSE_BODY_INVALID = {
  message: 'The map data is invalid',
};

export type BuildingShortestPath = {
  distance: number;
  path: string[];
};

export type ShortestPathWrapper = {
  shortestPath?: BuildingShortestPath;
  errorMessage?: string;
  code?: HttpStatus;
};

export type ShortestPathError = {
  message: string;
};
