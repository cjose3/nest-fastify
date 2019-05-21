import { Module } from '@nestjs/common'
import { LoggerService } from './services/logger.service'
import { DatabaseModule } from './db/db.module'
import { ConfigModule } from './config/config.module'

@Module({
  imports: [ConfigModule, DatabaseModule],
  providers: [LoggerService],
  exports: [LoggerService]
})
export class CoreModule {}
