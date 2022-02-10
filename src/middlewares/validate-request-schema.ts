import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import AppError from "../errors/AppError";

export function validateRequestSchema(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    //throw new AppError('Verifique bem os campos digitados ou o processo que fez se está correcto', 400)
    return res.status(400).json({ errors: errors.array() });
  }
  next()
}