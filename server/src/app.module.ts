import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from 'src/shared/config/jwt.config';
import { validateEnv } from 'src/shared/lib/validate-env';
import { HealthModule } from './modules/health/health.module';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { UsersModule } from 'src/modules/users/users.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { RoleGuard } from 'src/modules/auth/guards/role.guard';

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
    PrismaModule,
    HealthModule,
    UsersModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
