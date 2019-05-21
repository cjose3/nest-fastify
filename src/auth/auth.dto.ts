import { UserDto } from '../users/users.dto'
import { IsNotEmpty, IsDefined, ValidateNested } from 'class-validator'

export class CredentialsDto {
  @IsNotEmpty()
  readonly username!: string

  @IsNotEmpty()
  readonly password!: string
}

export class AuthTokenDto {
  @IsNotEmpty()
  readonly token!: string

  @IsDefined()
  @ValidateNested()
  readonly user!: UserDto
}
