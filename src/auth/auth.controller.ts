import type { Response } from 'express'
import {
  Body,
  Controller,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common'
import { LoginRequestDto } from './dto/login.request.dto'

@Controller('auth')
export class AuthController {
  @Post('login')
  login(
    @Body() body: LoginRequestDto,
    @Res({ passthrough: true }) res: Response,
  ): { ok: boolean } {
    if (body.email !== 'root@root.com' || body.password !== 'root')
      throw new UnauthorizedException('Invalid credentials')

    const token = 'example123'

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 1000 * 60 * 60, // time -> 3.600.000 ms -> 1H
    })

    return { ok: true }
  }
}
