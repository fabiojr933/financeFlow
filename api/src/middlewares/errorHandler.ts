import { Request, Response, NextFunction } from 'express'
import { AppError } from '../utils/AppError'

export function errorHandler(
  err: Error,
  _: Request,
  res: Response,
  __: NextFunction
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    })
  }

  console.error(err)

  return res.status(500).json({
    status: 'error',
    message: 'Erro interno do servidor',
  })
}
