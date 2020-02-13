import { NextFunction, Request, Response } from 'express';

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers || !req.headers.apikey) {
    return res.status(401).send({ message: 'Unauthorized' });
  }

  const apiKey: string = req.headers.apikey as string;
  if (apiKey.length === 0 || apiKey !== process.env.IMAGE_FILTER_API_KEY) {
    return res.status(403).send({ message: 'Access Denied' });
  }

  return next();
};
