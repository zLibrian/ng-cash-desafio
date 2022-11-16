import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import errorMap from '../utils/customErrorsMessage';

const handleErrors = (err: Error, req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof z.ZodError) {
    return res.status(400).json({ error: err.issues.map((issue) => issue.message) });
  }

  const { message, code } = errorMap[err.message];
  if (code) return res.status(code).json({ message });

  return res.status(500).json({ message: 'Internal Server Error' });
};

export default handleErrors;
