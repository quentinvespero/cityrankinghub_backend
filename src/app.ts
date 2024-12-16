import { configDotenv } from "dotenv"
import express from 'express'
import mongoose from "mongoose"

configDotenv()

const app = express()

// middleware
app.use(express.json())

// routes
app.use('/api/cityRankingHub')

// database connection
const MONGO_URI = process.env.MONGO_URI || 'error : no MONGO_URI given for mongoDB uri'

mongoose
    .connect(MONGO_URI)
    .then(() => console.log('connection to mongoDB database OK :)') )
    .catch((err) => console.error('error while trying to connect to mongoDB',err))

export default app