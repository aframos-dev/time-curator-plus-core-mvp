import { IsEmail, IsNotEmpty } from 'class-validator'
import { Transform } from 'class-transformer'

export class LoginRequestDto {
  @IsEmail()
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.toLowerCase().trim() : value,
  )
  email!: string

  @IsNotEmpty()
  password!: string
}
