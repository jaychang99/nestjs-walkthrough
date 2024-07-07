import { HttpException, HttpStatus } from '@nestjs/common';

export class AdminAccessException extends HttpException {
  constructor() {
    super('Lacks Admin Privileges', HttpStatus.FORBIDDEN);
  }
}
