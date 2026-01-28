import { Router } from 'express'
import { UserController } from '../controllers/UserController'
import { authMiddleware } from '../middlewares/authMiddleware'
import { validate } from '../validations/validate'
import { createUserSchema, updateUserSchema, } from '../validations/user.schema'

const router = Router()
const controller = new UserController()

router.use(authMiddleware)

router.post('/',  validate(createUserSchema), controller.create)
router.put('/:id', validate(updateUserSchema), controller.update)
router.get('/', controller.list)


router.delete('/:id', controller.delete)

export default router
