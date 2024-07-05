import {
  Body,
  Controller,
  Get,
  Header,
  Headers,
  HttpCode,
  HttpException,
  Ip,
  Param,
  Post,
  Query,
  Req,
  Res,
  Session,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('/cats')
export class CatsController {
  // assume GET: /cats?breed=retriever&age=23
  @Get()
  findAll(
    @Req() request: Request, // req

    @Query() queries: Request['query'], // req.query (QUERY STRING PARAMS)
    @Query('breed') breed: string, // req.query.breed
    @Query('age') age: string, // req.query.age

    @Headers() headers: Request['headers'], // req.headers
    @Headers('host') host: string, // req.headers.host

    @Ip() ip: Request['ip'], // req.ip

    @Session() session?: any, // what is the type of the session?
  ): string {
    console.log('request', request); // ...

    console.log('queries', queries); // { breed: 'retriever', age: '23' }
    console.log('breed', breed); // 'retriever'
    console.log('age', age); // '23' NOTE: that this is of type 'string'
    console.log(typeof age); // 'string'

    console.log('headers', headers); // { host: 'foo.bar', 'user-agent' : 'PostmanRuntime/7.39.0', ...}
    console.log('host', host); // 'foo.bar'

    console.log('ip', ip); // ...

    console.log('session', session); // ...

    return `this function returns all cats`;
  }

  /**
   * Route Wildcards
   * CAUTION: static paths must be defined above any dynamic paths such as GET :id.
   */
  // /cats/abcd
  // /cats/abefcd
  // /cats/abyzx1234cd
  @Get('ab*cd')
  getAbcd(): string {
    return `This route catches all paths that starts with /cats/ab and ends with cd`;
  }

  /**
   * Varying HTTP Status Codes
   */
  @Get('no-content')
  @HttpCode(204)
  sendNoContentResponse(): void {
    // sends nothing
  }

  @Get('accepted')
  @HttpCode(202)
  sendAcceptedResponse(): string {
    return `This route sends 202 Accepted response. `;
  }

  @Get('/forbidden')
  @HttpCode(403)
  sendForbiddenResponse(): string {
    return `This route send 403 Forbidden response. `;
  }

  @Get('/dynamic-response')
  sendDynamicResponse(
    @Query('isValid') isValid: string,
    @Res({ passthrough: true }) res: Response,
  ): string {
    // This route sends dynamic response based on query param of 'isValid'.

    if (isValid === 'true') {
      res.statusCode = 203; // manually set statusCode of underlying response object
      return `Valid Response`;
    }

    throw new HttpException('Bad Request', 400); // OR throw exceptions.
  }

  @Get('set-cache')
  @Header('Cache-Control', 'max-age=1800')
  sendResponseWithCacheControlHeader(): string {
    return `This route returns a reponse with a max-age of 1800`;
  }

  // assume: GET: /cats/1234
  @Get(':id')
  findOne(
    @Param() params: Request['params'], // req.params (PATH PARAMS)
    @Param('id') catId: string, // req.params.id
  ): string {
    console.log('params', params); // { id: '1234' }
    console.log('catId', catId); // '1234'

    const { id } = params;

    return `this function returns #${id} cat. `;
  }

  // assume POST: /cats
  @Post()
  create(
    @Body() body: Request['body'], // req.body
    @Body('age') age: number, // req.body.age
    @Body('breed') breed: string, // req.body.breed
  ): string {
    console.log('body', body); // { age: 8, breed: 'retriever' }
    console.log('age', age); // 8 NOTE: that this is of type number (body is automatically parsed)
    console.log(typeof age); // 'number'
    console.log('breed', breed); // 'retriever'

    return `this function creates a new cat`;
  }
}
