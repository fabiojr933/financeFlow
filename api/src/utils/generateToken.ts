import jwt from 'jsonwebtoken'
import authConfig from '../config/auth'

interface TokenPayload {
  sub: string
}

export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, authConfig.secret, {
    expiresIn: authConfig.expiresIn,
  })
}
