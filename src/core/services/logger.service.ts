import { Injectable, LoggerService as ILoggerService } from '@nestjs/common'
import * as pino from 'pino'
import { ConfigService } from '../config/config.service'

@Injectable()
export class LoggerService implements ILoggerService {
  readonly logger: pino.Logger

  constructor(config: ConfigService) {
    this.logger = pino({
      level: config.logLevel,
      prettyPrint: config.isDevelopment ? { levelFirst: true } : false
    })
  }

  log(message: any) {
    this.logger.info(message)
  }
  error(message: any) {
    this.logger.error(message)
  }
  warn(message: any) {
    this.logger.warn(message)
  }
}
