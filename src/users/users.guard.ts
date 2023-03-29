import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { Observable } from 'rxjs';
import { verifyToken } from 'src/helpers/security';

//Checking if user is an admin
@Injectable()
export class IsAdmin implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    return checkRole(req, Role.ADMIN);
  }
}

//Checking if user is an super admin
@Injectable()
export class IsSuperAdmin implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    return checkRole(req, Role.SUPER_ADMIN);
  }
}

//Checking role
function checkRole(req: Request, checkRole: Role) {
  if (!req.headers['authorization']) {
    throw new ForbiddenException('User not logged in');
  }

  try {
    const { userId, role } = verifyToken(
      req.headers['authorization'].split(' ')[1],
    );
    if (userId && role === checkRole) {
      return true;
    } else {
      throw new UnauthorizedException(
        "Unauthorized action, you're not an admin",
      );
    }
  } catch (error) {
    if (error.status === 401) {
      throw error;
    }
    throw new BadRequestException(
      'Invalid or expired auth token detected, login again',
    );
  }
}
