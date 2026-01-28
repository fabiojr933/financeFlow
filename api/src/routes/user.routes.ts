import { Router } from 'express'
import { UserController } from '../controllers/UserController'
import { authMiddleware } from '../middlewares/authMiddleware'
<<<<<<< HEAD
import { authMiddlewareToken } from '../middlewares/authMiddlewareToken'
=======
>>>>>>> db90de10da8fe9e54a3c516387fab563c0ad14d3
import { validate } from '../validations/validate'
import { createUserSchema, updateUserSchema, } from '../validations/user.schema'

const router = Router()
const controller = new UserController()

<<<<<<< HEAD
router.post('/', authMiddlewareToken, validate(createUserSchema), controller.create)

router.use(authMiddleware)

=======
router.use(authMiddleware)

router.post('/',  validate(createUserSchema), controller.create)
>>>>>>> db90de10da8fe9e54a3c516387fab563c0ad14d3
router.put('/:id', validate(updateUserSchema), controller.update)
router.get('/', controller.list)


router.delete('/:id', controller.delete)

export default router
