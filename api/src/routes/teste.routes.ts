import { Router } from 'express'
import { TesteController } from '../controllers/TesteController'

const router = Router()
const controller = new TesteController()


router.get('/', controller.list)

export default router
