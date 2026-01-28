import bcrypt from 'bcryptjs'
import { UserRepository } from '../repositories/UserRepository'
import { AppError } from '../utils/AppError'

export class UserService {
  private repo = new UserRepository()

  async create({ name, email, password }: any) {
    const exists = await this.repo.findByEmail(email)
    if (exists) throw new AppError('Email já cadastrado')

    const hashed = await bcrypt.hash(password, 10)

    return this.repo.create({
      name,
      email,
      password: hashed,
    })
  }

  async list() {
    return this.repo.findAll()
  }

  async update(id: string, data: any) {
    return this.repo.update(id, data)
  }

  async delete(id: string) {
    return this.repo.delete(id)
  }
}
