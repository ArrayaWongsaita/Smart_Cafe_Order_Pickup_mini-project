import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const configDocumentSwagger = (app: INestApplication<any>) => {
  const config = new DocumentBuilder()
    .setTitle('cafe API')
    .setDescription('The cafe API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    customJs: ['/swagger/swagger-inject.js'],
  });
};
