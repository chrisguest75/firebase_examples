import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import swaggerUi from 'swagger-ui-express'
import { RegisterRoutes } from './routes/routes.js'
import 'reflect-metadata'
import * as functions from 'firebase-functions'

const app = express()

// Middleware
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Register TSOA routes
RegisterRoutes(app)

// Swagger UI setup
app.use('/api/docs', swaggerUi.serve, async (_req: express.Request, res: express.Response) => {
  const swaggerDocument = await import('../public/swagger.json')
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
