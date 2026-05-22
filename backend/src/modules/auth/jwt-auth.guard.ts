import {
  Injectable,
  UnauthorizedException,
  ExecutionContext,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';

type JwtUser = {
  id: number;
  username: string;
  role: string;
};

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest<TUser = JwtUser>(
    err: unknown,
    user: TUser,
    info: unknown,
  ): TUser {
    if (info) {
      throw new UnauthorizedException('Token inválido ou expirado.');
    }

    if (err || !user) {
      throw new UnauthorizedException(
        'Acesso não autorizado. Informe um token JWT válido.',
      );
    }

    return user;
  }
}
