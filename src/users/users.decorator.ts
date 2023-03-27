import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { verifyToken } from 'src/helpers/security';

export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    if (!request.headers['authorization']) {
      throw new ForbiddenException('User not logged in');
    }

    try {
      const { userId } = verifyToken(
        request.headers.authorization.split(' ')[1],
      );
      return userId;
    } catch (error) {
      throw new BadRequestException(
        'Invalid or expired auth token detected, login again',
      );
    }
  },
);
