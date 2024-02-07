import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AmoConfigService } from './amo-config.service';
@Module({
  imports: [ConfigModule.forRoot()],
  providers: [AmoConfigService],
  exports: [AmoConfigService],
})
export class AmoConfigModule {}
