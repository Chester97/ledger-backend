import { NestMiddleware, Injectable, Req, Res, Body } from '@nestjs/common';
import { Response, Request } from 'express';
import { isEmpty } from 'rambda';

@Injectable()
export class BodyMiddleware implements NestMiddleware {
  use(@Req() req: Request, @Res() res: Response, next: () => void) {
    if (isEmpty(req.body)) {
      return res.send('Body should be filled');
    }
    next();
  }
}
