import { Router } from 'express'
import { AuthController } from '../controllers/AuthController'
import { validate } from '../validations/validate'
import { loginSchema } from '../validations/auth.schema'

const router = Router()
const controller = new AuthController()

router.post('/login', validate(loginSchema), controller.login)

export default router
