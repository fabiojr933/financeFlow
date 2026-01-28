import express from 'express'
import routes from './routes'
import 'dotenv/config'
import { errorHandler } from './middlewares/errorHandler'


const app = express()

app.use(errorHandler)
app.use(express.json())
app.use(routes)

export default app
