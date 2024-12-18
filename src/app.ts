import express from 'express'
import dbConnection from './config/dbConnection'

const app = express()

// middleware
app.use(express.json())

// routes
// app.get('/api/cityRankingHub')

// db connection
dbConnection()

export default app