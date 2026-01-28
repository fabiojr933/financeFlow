import { Request, Response } from 'express'
import { UserService } from '../services/UserService'


export class UserController {
  private service = new UserService()

  create = async (req: Request, res: Response) => {
    const user = await this.service.create(req.body)
    return res.status(201).json(user)
  }

  list = async (_: Request, res: Response) => {
    const users = await this.service.list()
    return res.json(users)
  }

  update = async (req: Request, res: Response) => {
    const id = req.params.id as string

    const user = await this.service.update(id, req.body)

    return res.json(user)
  }

  delete = async (req: Request, res: Response) => {
    const id = req.params.id as string
    await this.service.delete(id)
    return res.status(204).send()
  }
}
