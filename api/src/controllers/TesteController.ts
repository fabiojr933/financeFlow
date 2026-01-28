import { Request, Response } from 'express'

export class TesteController {
  list = async (_: Request, res: Response) => {
    const users = {
      fabio: 'pereira',
    }

    return res.json(users)
  }
}
