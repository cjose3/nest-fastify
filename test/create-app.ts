import { NestFastifyApplication, FastifyAdapter } from '@nestjs/platform-fastify'
import { AppModule } from '../src/app.module'
import { TestingModule, Test } from '@nestjs/testing'
import { ValidationPipe } from '@nestjs/common'

export async function createNestFastifyApplication(): Promise<NestFastifyApplication> {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule]
  }).compile()

  const app: NestFastifyApplication = moduleFixture.createNestApplication<NestFastifyApplication>(new FastifyAdapter())
  app.useGlobalPipes(new ValidationPipe())
  await app.init()
  await app
    .getHttpAdapter()
    .getInstance()
    .ready()

  return app
}
