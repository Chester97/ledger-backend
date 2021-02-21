import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { isEmpty } from 'rambda';

@Injectable()
export class BodyRequestGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { body } = context.switchToHttp().getRequest();
    if (isEmpty(body)) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'You should pass valid body',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return true;
  }
}
