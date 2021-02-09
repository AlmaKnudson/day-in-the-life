import { Injectable, Logger } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Graph = require('node-dijkstra');

@Injectable()
export class DijkstraService {
  dijkstra(buildings: any, start: string, end: string): any {
    const route = new Graph();
    for (const [key, value] of Object.entries(buildings)) {
      Logger.log(`${key}: ${JSON.stringify(value)}`);
      route.addNode(key, value);
    }
    return route.path(start, end, { cost: true });
  }
}
