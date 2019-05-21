import { Controller, Post, Body, UseInterceptors, ClassSerializerInterceptor, HttpCode } from '@nestjs/common'
import { CredentialsDto, AuthTokenDto } from './auth.dto'
import { AuthService } from './auth.service'

@Controller()
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/login')
  @HttpCode(200)
  async login(@Body() credentials: CredentialsDto): Promise<AuthTokenDto> {
    return this.service.login(credentials)
  }
}
