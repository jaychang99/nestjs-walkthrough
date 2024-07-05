import {
  Body,
  Controller,
  Get,
  Headers,
  Ip,
  Param,
  Post,
  Query,
  Req,
  Session,
} from '@nestjs/common';
import { Request } from 'express';

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

  // assume: GET: /cats/1234
  @Get('/:id')
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
