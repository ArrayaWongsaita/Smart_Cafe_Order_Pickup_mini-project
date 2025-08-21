import { AlreadyExistException } from 'src/shared/exceptions/already-exist.exception';
import { createAlreadyExistsMessage } from 'src/shared/utils/create-error/create-message.util';

const createFunctionThrowErrorAlreadyExistsException =
  (type: string) => (value: string) => {
    const errorMessage = createAlreadyExistsMessage(type, value);
    throw new AlreadyExistException(errorMessage);
  };

export const throwErrorEmailAlreadyExistsException =
  createFunctionThrowErrorAlreadyExistsException('email');
