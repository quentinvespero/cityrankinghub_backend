import express, { Request, Response } from 'express'
import dbConnection from './config/dbConnection'

const app = express()

// registering the middleware
// this is used to parse all incoming requet into json format
app.use(express.json())

// dummy route to know if the API is running
app.get('/', (req:Request, res:Response) => {res.send('API is working :)')})

// app.use('/post')

// db connection
dbConnection()

export default app