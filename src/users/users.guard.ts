import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { isAlphanumeric, isString, length } from 'class-validator';
import { Observable } from 'rxjs';

@Injectable()
export class UpdateProfileGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    let message: string = 'invalid';
    const { username, image, about } = req.body as any;
    if (username && (!isAlphanumeric(username) || !length(username, 5, 20))) {
      message += ' username';
    }
    if (image && (!isString(image) || !length(image, 5))) {
      message += ', image';
    }
    if (about && (!isString(about) || !length(about, 3, 100))) {
      message += ', about format';
    }
    if (message !== 'invalid') {
      throw new BadRequestException(message);
    }
    return true;
  }
}
