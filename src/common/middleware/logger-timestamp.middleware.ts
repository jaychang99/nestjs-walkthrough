import { NextFunction, Request, Response } from 'express';

export function loggerTimestamp(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log(
    `
[REQUEST] Timestamp: ${new Date().getTime()}  
URL: ${req.url}
HOST: ${req.hostname}
`,
  );
  next(); // or else request hangs
}
