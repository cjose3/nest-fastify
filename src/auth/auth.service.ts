import { Injectable, UnauthorizedException } from '@nestjs/common'
import { CredentialsDto, AuthTokenDto } from './auth.dto'
import { UsersService } from '../users/users.service'

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async login(credentials: CredentialsDto): Promise<AuthTokenDto> {
    const { username, password } = credentials
    const user = await this.usersService.getRepository().findOne({ username })

    if (!user || !(await user.validatePassword(password))) {
      throw new UnauthorizedException('Invalid credentials')
    }

    return {
      user,
      token: '10000000'
    }
  }
}
