import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from 'src/shared/config/jwt.config';
import { validateEnv } from 'src/shared/lib/validate-env';
import { HealthModule } from './modules/health/health.module';

@Module({
  imports: [
    // for serving static files  Swagger UI
    ServeStaticModule.forRoot({
      rootPath: join('public', 'swagger'),
      serveRoot: '/swagger',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [jwtConfig],
      validate: validateEnv,
    }),
    HealthModule,
  ],
  providers: [],
})
export class AppModule {}
