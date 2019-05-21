import { Controller, Post, Get, Body, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common'
import { UsersService } from './users.service'
import { UserDto, CreateUserDto } from './users.dto'

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  list(): Promise<UserDto[]> {
    return this.service.find()
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(@Body() newUser: CreateUserDto): Promise<UserDto> {
    return this.service.create(newUser)
  }
}
