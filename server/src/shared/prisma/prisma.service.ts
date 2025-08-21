import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleDestroy() {
    console.log('Database connection closed');
    await this.$disconnect();
  }
  async onModuleInit() {
    console.log('Database connection established');
    await this.$connect();
  }
}
