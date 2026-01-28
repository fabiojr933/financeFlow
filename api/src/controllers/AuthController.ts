import { Request, Response } from 'express'
import { AuthService } from '../services/AuthService'

export class AuthController {
  private service = new AuthService()

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body
    const data = await this.service.login(email, password)
    return res.json(data)
  }
}
