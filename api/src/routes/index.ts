import { Router } from 'express'
import authRoutes from './auth.routes'
import userRoutes from './user.routes'
import testeRoutes from './teste.routes'

const routes = Router()

routes.use('/auth', authRoutes)
routes.use('/users', userRoutes)

routes.use('/teste', testeRoutes)

export default routes
