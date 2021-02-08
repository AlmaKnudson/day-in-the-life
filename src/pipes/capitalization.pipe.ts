import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class CapitalizationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return value.toUpperCase();
  }
}
