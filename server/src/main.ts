import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { corsOptions } from 'src/shared/config/cors.config';
import globalPipes from 'src/shared/pipes/global.pipe';
import { GlobalFilter } from 'src/shared/filters/global.filter';
import { configDocumentSwagger } from 'src/shared/docs/swagger/config-document.swagger';
import { LoggingInterceptor } from 'src/shared/interceptors/logging.interceptor';
import { portConfig } from 'src/shared/config/env.config';
import { versionConfig } from 'src/shared/config/version.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configure CORS with environment variables
  app.enableCors(corsOptions);

  // Configure versioning
  app.enableVersioning(versionConfig);

  // Configure validation pipe with transform enabled
  app.useGlobalPipes(globalPipes);

  // Configure global filters
  app.useGlobalFilters(new GlobalFilter());

  // Configure Swagger
  configDocumentSwagger(app);

  // Configure logging interceptor
  app.useGlobalInterceptors(new LoggingInterceptor());

  // Start the application
  await app.listen(portConfig.port, () =>
    console.log(`Server is running on port : ${portConfig.port}`),
  );
}
void bootstrap();
