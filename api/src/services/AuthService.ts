import bcrypt from 'bcryptjs'
import { UserRepository } from '../repositories/UserRepository'
import { AppError } from '../utils/AppError'
import { generateToken } from '../utils/generateToken'

export class AuthService {
  private repo = new UserRepository()

  async login(email: string, password: string) {
    const user = await this.repo.findByEmail(email)
    if (!user) throw new AppError('Credenciais inválidas', 401)

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) throw new AppError('Credenciais inválidas', 401)

    const token = generateToken({ sub: user.id })

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    }
  }
}
