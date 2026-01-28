import { Router } from 'express'
import { UserController } from '../controllers/UserController'
import { authMiddleware } from '../middlewares/authMiddleware'
import { authMiddlewareToken } from '../middlewares/authMiddlewareToken'
import { validate } from '../validations/validate'
import { createUserSchema, updateUserSchema, } from '../validations/user.schema'

const router = Router()
const controller = new UserController()

router.post('/', authMiddlewareToken, validate(createUserSchema), controller.create)

router.use(authMiddleware)

router.put('/:id', validate(updateUserSchema), controller.update)
router.get('/', controller.list)


router.delete('/:id', controller.delete)

export default router
