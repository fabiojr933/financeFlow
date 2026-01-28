<<<<<<< HEAD
import { ZodError, ZodSchema } from 'zod'
=======
import { ZodSchema } from 'zod'
>>>>>>> db90de10da8fe9e54a3c516387fab563c0ad14d3
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
<<<<<<< HEAD
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
=======
    } catch (error: any) {
      return res.status(400).json({
        message: 'Erro de validação',
        errors: error.errors,
>>>>>>> db90de10da8fe9e54a3c516387fab563c0ad14d3
      })
    }
  }
}
