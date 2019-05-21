import { Injectable, ConflictException } from '@nestjs/common'
import { UserEntity } from './user.entity'
import { UserDto, CreateUserDto } from './users.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, QueryFailedError } from 'typeorm'
import { isNonUniqueError } from '../utils/db-errors'

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserEntity) private readonly repository: Repository<UserEntity>) {}

  getRepository(): Repository<UserEntity> {
    return this.repository
  }

  find(): Promise<UserDto[]> {
    return this.repository.find()
  }

  async create(newUser: CreateUserDto): Promise<UserDto> {
    const entity = this.repository.create(newUser)
    try {
      return await this.repository.save(entity)
    } catch (error) {
      if (error instanceof QueryFailedError && isNonUniqueError(error)) {
        throw new ConflictException()
      }
      return error
    }
  }
}
