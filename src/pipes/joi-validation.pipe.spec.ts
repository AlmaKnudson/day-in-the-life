import { string } from 'joi';
import { JoiValidationPipe } from './joi-validation.pipe';

describe('JoiValidationPipe', () => {
  it('should be defined', () => {
    expect(new JoiValidationPipe(string().min(1))).toBeDefined();
  });
});
