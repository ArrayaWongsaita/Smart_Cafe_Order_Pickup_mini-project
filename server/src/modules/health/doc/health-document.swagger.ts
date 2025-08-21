import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

export function CheckHealthDocument() {
  return applyDecorators(
    ApiTags('Health'),
    ApiOperation({ summary: 'Health check' }),
    ApiResponse({
      status: 200,
      description: 'Health check passed',
      schema: {
        type: 'object',
        properties: {
          status: { type: 'string', example: 'ok' },
          timestamp: {
            type: 'string',
            format: 'date-time',
            example: new Date().toISOString(),
          },
          message: { type: 'string', example: 'Health check passed' },
        },
      },
    }),
  );
}
