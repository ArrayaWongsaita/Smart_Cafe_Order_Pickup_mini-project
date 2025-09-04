import { NotFoundException } from 'src/shared/exceptions/not-found.exception';
import { createNotFoundMessage } from 'src/shared/utils/create-error/create-message.util';

function createFunctionThrowErrorNotFoundException(
  type: string,
): (value: string) => never {
  return (value: string) => {
    const errorMessage = createNotFoundMessage(type, value);
    throw new NotFoundException(errorMessage);
  };
}

export const throwErrorEmailNotFoundException =
  createFunctionThrowErrorNotFoundException('email');
