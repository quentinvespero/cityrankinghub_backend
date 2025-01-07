import express, { Request, Response } from 'express'
import dbConnection from './config/dbConnection'

const app = express()

// middleware
app.use(express.json())

// routes
app.get('/', (req:Request, res:Response) => res.send('API is working :)'))

// db connection
dbConnection()

export default app