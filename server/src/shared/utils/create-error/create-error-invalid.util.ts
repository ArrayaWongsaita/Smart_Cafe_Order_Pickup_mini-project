import { InvalidException } from 'src/shared/exceptions/invalid.exception';
import { InvalidMessageEnumType } from 'src/shared/types/invalid-enum.type';

export function throwErrorInvalidException(details: InvalidMessageEnumType) {
  throw new InvalidException(details);
}
