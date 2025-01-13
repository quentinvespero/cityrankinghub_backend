import express, { Request, Response } from 'express'
import dbConnection from './config/dbConnection'
import reviewRoutes from './routes/review.routes'

const app = express()

// registering the middleware
// this is used to parse all incoming requet into json format
app.use(express.json())

// dummy route to check if the API is running
app.get('/', (req:Request, res:Response) => {res.send('API is working :)')})

// routes for reviews
app.use('/review', reviewRoutes)

// db connection
dbConnection()

export default app