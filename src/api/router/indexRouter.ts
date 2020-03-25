import { Router } from 'express'

import { asyncHandler } from '../middleware/async-handler'

import { IndexController } from '../controller'

const indexRouter = Router()

indexRouter.get('/', asyncHandler(IndexController.Index))

export { indexRouter }
