import { Inject, Injectable, Optional } from '@nestjs/common';

/**
 * Optional Providers
 */
@Injectable()
export class HttpService<T> {
  constructor(@Optional() @Inject('HTTP_OPTIONS') private httpClient: T) {}
}
