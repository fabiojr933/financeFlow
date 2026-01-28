import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import authConfig from '../config/auth'

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ error: 'Token ausente' })

  try {
    jwt.verify(token, authConfig.secret)
    next()
  } catch {
    return res.status(401).json({ error: 'Token inválido' })
  }
}
