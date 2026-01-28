import { ZodSchema } from 'zod'
import { Request, Response, NextFunction, RequestHandler } from 'express'

export const validate = (schema: ZodSchema): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      })

      next()
    } catch (error: any) {
      return res.status(400).json({
        message: 'Erro de validação',
        errors: error.errors,
      })
    }
  }
}
