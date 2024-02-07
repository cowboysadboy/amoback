import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpServiceService } from './http-service/http-service.service';
import { LeadsController } from './api/leads/leads.controller';
import { HttpModule } from '@nestjs/axios';
import { AmoConfigModule } from './amo-config/amo-config.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, AmoConfigModule, ConfigModule],
  controllers: [AppController, LeadsController],
  providers: [AppService, HttpServiceService],
})
export class AppModule {}
