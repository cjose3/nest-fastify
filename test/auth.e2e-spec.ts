import * as faker from 'faker'
import * as request from 'supertest'
import { NestFastifyApplication } from '@nestjs/platform-fastify'
import { createNestFastifyApplication } from './create-app'
import { HttpServer, HttpStatus } from '@nestjs/common'
import { CredentialsDto } from '../src/auth/auth.dto'
import { generateCreateUserDto } from './user.utils'

describe('AuthController (e2e)', () => {
  let app: NestFastifyApplication
  let server: HttpServer

  beforeEach(async () => {
    app = await createNestFastifyApplication()
    server = app.getHttpServer()
  })

  afterEach(async () => {
    await app.close()
  })

  it('/login (POST)', async () => {
    const newUser = generateCreateUserDto()

    await request(server)
      .post('/users')
      .send(newUser)
      .expect(HttpStatus.CREATED)

    const { body } = await request(server)
      .post('/login')
      .send(newUser as CredentialsDto)
      .expect(HttpStatus.OK)

    expect(body).toHaveProperty('token')
    expect(body).toHaveProperty('user')

    const wrongCredentials: CredentialsDto = {
      username: faker.internet.userName(),
      password: faker.internet.password(5)
    }

    await request(server)
      .post('/login')
      .send(wrongCredentials)
      .expect(HttpStatus.UNAUTHORIZED)

    await request(server)
      .post('/login')
      .expect(HttpStatus.BAD_REQUEST)
  })
})
