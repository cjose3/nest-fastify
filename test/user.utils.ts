import * as faker from 'faker'
import { UserDto, CreateUserDto } from '../src/users/users.dto'

export function generateCreateUserDto(): CreateUserDto {
  return {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  }
}

export function assertUserDto(user: UserDto) {
  expect(user).toHaveProperty('id')
  expect(user).toHaveProperty('username')
  expect(user).toHaveProperty('email')
  expect(user).not.toHaveProperty('password')
  expect(user).not.toHaveProperty('createdAt')
  expect(user).not.toHaveProperty('updatedAt')
}
