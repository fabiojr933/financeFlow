import { Request, Response, NextFunction } from 'express'

export function authMiddlewareToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ error: 'Token ausente' })

  try {
    if(token == process.env.JWT_SECRET){
      next()
    }else{
       return res.status(401).json({ error: 'Token invalido ou errado' })
    }    
  } catch {
    return res.status(401).json({ error: 'Token inválido' })
  }
}
