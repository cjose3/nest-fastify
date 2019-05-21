import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { AppModule } from './app.module'
import { LoggerService } from './core/services/logger.service'
import { ConfigService } from './core/config/config.service'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter())
  const config = app.get(ConfigService)
  app.useLogger(app.get(LoggerService))
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(config.port)
}
bootstrap()
