import { IsEmail, IsNotEmpty, IsString, IsAlphanumeric } from 'class-validator'

export class UserDto {
  @IsNotEmpty()
  @IsString()
  readonly id!: string

  @IsNotEmpty()
  @IsAlphanumeric()
  readonly username!: string

  @IsNotEmpty()
  @IsEmail()
  readonly email!: string

  @IsString()
  readonly firstName?: string

  @IsString()
  readonly lastName?: string
}

export class CreateUserDto {
  @IsNotEmpty()
  readonly username!: string

  @IsNotEmpty()
  readonly password!: string

  @IsEmail()
  readonly email!: string
}
