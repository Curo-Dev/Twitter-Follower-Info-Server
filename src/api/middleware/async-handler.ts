import { RequestHandler, Request, Response, NextFunction } from 'express'

export const asyncHandler = (handler: RequestHandler) => (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise.resolve(handler(req, res, next)).catch(next)