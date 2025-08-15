import { logger } from './logger.js'
import express from 'express'
import bodyParser from 'body-parser'
import pino from 'express-pino-logger'
import swaggerUi from 'swagger-ui-express'
import { RegisterRoutes } from './routes/routes.js'
import cors, { CorsOptions } from 'cors'
import 'reflect-metadata'
import * as functions from 'firebase-functions'
import { backendConfig } from './config/config.js'
import swaggerDocument from '../public/swagger.json' assert { type: "json" };


logger.info(`Pino:${logger.version}`)
logger.info({ backendConfig })
const app = express()

app.use(pino())

// Middleware
// Configure the CORS middleware
const allowedOrigins: string[] = ['http://localhost:3000']
if (backendConfig.frontendUrl) {
  allowedOrigins.push(backendConfig.frontendUrl)
}
logger.info({ allowedOrigins })
const corsOptions: CorsOptions = {
  origin: (origin, cb) => {
    if (!origin) return cb(null, true) // allow non-browser tools
    cb(null, allowedOrigins.includes(origin))
  },
  credentials: true,
}

app.use((req, _res, next) => {
  // quick debug to verify what Origin you’re getting
  logger.info({ origin: req.headers.origin })
  next()
})

app.use(cors(corsOptions))
app.options('*', cors(corsOptions)) // handle preflight globally

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Register TSOA routes
RegisterRoutes(app)

app.use('/docs', swaggerUi.serve, (_req: express.Request, res: express.Response) => {
  res.send(swaggerUi.generateHTML(swaggerDocument))
})

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response /*, next: express.NextFunction*/) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Something went wrong!' })
})

// simple_vite_backend is the name of the function
// firebase --project $PROJECT_ID deploy --only functions:simple_vite_backend
export const simple_vite_backend = functions.https.onRequest(
  {
    minInstances: 0,
    maxInstances: 1,
    region: process.env.REGION || 'europe-west2',
  },
  app,
)

export default simple_vite_backend
