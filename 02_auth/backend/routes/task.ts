import express, { Request, Response, NextFunction } from 'express'
import { logger } from '../src/logger'

const router = express.Router()

// use underscores to ignore parameters ", _next: NextFunction"
const taskHandler = async (_request: Request, response: Response) => {
    logger.info(`taskHandler`)

    response.status(200).json({ tasks: [{ title: 'Task1' }, { title: 'Task2' }] })
}

router.get('/', taskHandler)

export { router as taskRouter }
