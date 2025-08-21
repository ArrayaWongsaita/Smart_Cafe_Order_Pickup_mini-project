import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ResponseValidationInterceptor } from 'src/shared/interceptors/response-validation.Interceptor';

export default function ValidateResponse(dto: new () => object) {
  return applyDecorators(
    ApiResponse({
      status: 200,
      description: 'Response is valid',
      type: dto,
    }),
    UseInterceptors(new ResponseValidationInterceptor(dto)),
  );
}
