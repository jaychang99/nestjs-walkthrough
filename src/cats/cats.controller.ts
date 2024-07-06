import {
  Body,
  Controller,
  Get,
  Header,
  Headers,
  HttpCode,
  HttpException,
  HttpRedirectResponse,
  HttpStatus,
  Ip,
  Param,
  Post,
  Query,
  Redirect,
  Req,
  Res,
  Session,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, of } from 'rxjs';
import { CatsService } from 'src/cats/cats.service';
import { CreateCatDto } from 'src/cats/dtos/create-cat.dto';
import { Cat } from 'src/cats/interfaces/cat.interface';

@Controller('/cats')
export class CatsController {
  constructor(private catsService: CatsService) {} // same as this.catsService = catsService thanks to `private` keyword
  /**
   * Library-Specific Approach
   * Directly manipulate express res object. (Not Recommended)
   */
  @Post('express')
  createWithExpress(@Res() res: Response) {
    res.status(HttpStatus.CREATED).send();
  }

  @Get('express')
  findAllWithExpress(@Res() res: Response) {
    res.status(HttpStatus.OK).json([]);
  }

  @Post('express/passthrough')
  createWithExpressPassthrough(@Res({ passthrough: true }) res: Response) {
    res.status(HttpStatus.CREATED); // no need to res.send() thanks to passthrough

    return `Creating with Express`;
  }

  @Get('express/passthrough')
  findAllWithExpressPassthrough(@Res({ passthrough: true }) res: Response) {
    res.status(HttpStatus.OK); // no need to res.json() thanks to passthrough

    return [];
  }

  /**
   * Exploring some commonly used decorators for parsing request.
   */
  // assume GET: /cats?breed=retriever&age=23
  @Get()
  async findAll(
    @Req() request: Request, // req

    @Query() queries: Request['query'], // req.query (QUERY STRING PARAMS)
    @Query('breed') breed: string, // req.query.breed
    @Query('age') age: string, // req.query.age

    @Headers() headers: Request['headers'], // req.headers
    @Headers('host') host: string, // req.headers.host

    @Ip() ip: Request['ip'], // req.ip

    @Session() session?: any, // what is the type of the session?
  ): Promise<Cat[]> {
    console.log('request', request); // ...

    console.log('queries', queries); // { breed: 'retriever', age: '23' }
    console.log('breed', breed); // 'retriever'
    console.log('age', age); // '23' NOTE: that this is of type 'string'
    console.log(typeof age); // 'string'

    console.log('headers', headers); // { host: 'foo.bar', 'user-agent' : 'PostmanRuntime/7.39.0', ...}
    console.log('host', host); // 'foo.bar'

    console.log('ip', ip); // ...

    console.log('session', session); // ...

    return this.catsService.findAll();
  }

  /**
   * Asynchronicity
   */
  @Get('asynchronous')
  async findAllAsync(): Promise<any[]> {
    return [];
  }

  // return rxjs Observable streams
  @Get('observable-stream')
  findAllObservableStream(): Observable<any[]> {
    return of([]);
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

  /**
   * Setting response headers per endpoint.
   */
  @Get('set-cache')
  @Header('Cache-Control', 'max-age=1800')
  sendResponseWithCacheControlHeader(): string {
    return `This route returns a reponse with a max-age of 1800`;
  }

  @Get('set-cache-dynamically')
  sendResponseWithCacheControlHeaderDynamically(
    @Res({ passthrough: true }) res: Response, // with no passthrough: true, response hangs unless explicitly sent by res.json() or res.send(), etc.
    @Query('isCached') isCached: string,
  ): string {
    if (isCached === 'true') {
      res.setHeader('Cache-Control', 'max-age=1800');
    }

    return `This route sets max-age conditionally based on 'isCached' query string parameter`;
  }

  /**
   * Setting Redirects
   */
  @Get('redirect')
  @Redirect('https://google.com', 301)
  redirectToGoogle(): string {
    return `This route redirects to google.com`;
  }

  @Get('conditional-redirect')
  @Redirect('https://google.com', 301)
  redirectToGoogleConditionally(
    @Query('shouldRedirect') shouldRedirect: string,
  ): HttpRedirectResponse | void {
    if (shouldRedirect === 'true') {
      return { url: 'https://nestjs.com', statusCode: 301 }; // override url
    }
  }

  /**
   * Path Params
   */
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

  /**
   * DTOs, post decorator
   */
  // assume POST: /cats
  @Post()
  async create(
    @Body() createCatDto: CreateCatDto, // req.body
    @Body('age') age: number, // req.body.age
    @Body('breed') breed: string, // req.body.breed
  ) {
    console.log('createCatDto', createCatDto); // { age: 8, breed: 'retriever', name: 'apple' }
    console.log('age', age); // 8 NOTE: that this is of type number (body is automatically parsed)
    console.log(typeof age); // 'number'
    console.log('breed', breed); // 'retriever'

    return this.catsService.create(createCatDto);
  }
}
