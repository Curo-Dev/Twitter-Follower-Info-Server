import { Router } from 'express'
import { indexRouter } from './'

const rootRouter = Router()
rootRouter.use('/', indexRouter)

export { rootRouter }
