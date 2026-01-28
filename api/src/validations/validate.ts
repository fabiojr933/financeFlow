import { ZodError, ZodSchema } from 'zod'
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
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: 'Erro de validação',
          errors: error.issues.map(issue => ({
            field: issue.path.join('.'),
            message: issue.message,
          })),
        })
      }

      return res.status(500).json({
        message: 'Erro interno do servidor',
      })
    }
  }
}
