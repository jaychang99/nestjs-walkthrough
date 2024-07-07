import {
  CanActivate,
  ExecutionContext,
  GoneException,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    return validateRequest(request);
  }
}
function validateRequest(
  request: Request<
    import('express-serve-static-core').ParamsDictionary,
    any,
    any,
    import('qs').ParsedQs,
    Record<string, any>
  >,
): boolean | Promise<boolean> | Observable<boolean> {
  // dummy validation
  if (request.hostname === 'localhost') return true;

  // dummy exception
  throw new GoneException(); // any exceptions thrown by a guard will be handled by the exceptions layer.
}
