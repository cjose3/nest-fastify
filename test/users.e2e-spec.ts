import * as request from 'supertest'
import * as faker from 'faker'
import { HttpServer, HttpStatus } from '@nestjs/common'
import { NestFastifyApplication } from '@nestjs/platform-fastify'
import { createNestFastifyApplication } from './create-app'

import { generateCreateUserDto, assertUserDto } from './user.utils'

describe('UsersController (e2e)', () => {
  let app: NestFastifyApplication
  let server: HttpServer

  beforeEach(async () => {
    app = await createNestFastifyApplication()
    server = app.getHttpServer()
  })

  afterEach(async () => {
    await app.close()
  })

  it('/users (POST)', async () => {
    const user = generateCreateUserDto()

    const { body } = await request(server)
      .post('/users')
      .send(user)
      .expect(HttpStatus.CREATED)

    assertUserDto(body)
    expect(body.username).toBe(user.username)
    expect(body.email).toBe(user.email)

    await request(server)
      .post('/users')
      .send(user)
      .expect(HttpStatus.CONFLICT)

    await request(server)
      .post('/users')
      .expect(HttpStatus.BAD_REQUEST)

    const wrongUser = {
      userName: faker.internet.userName(),
      password: faker.internet.password()
    }

    await request(server)
      .post('/users')
      .send(wrongUser)
      .expect(HttpStatus.BAD_REQUEST)
  })

  it('/users (GET)', async () => {
    const { body } = await request(server)
      .get('/users')
      .expect(HttpStatus.OK)

    expect(body).toBeInstanceOf(Array)
    body.forEach(assertUserDto)
  })
})
