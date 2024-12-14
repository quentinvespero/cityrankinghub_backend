import { configDotenv } from "dotenv"
import express from 'express'

configDotenv()

const app = express()

app.use(express.json())

app.use('api/cityRankingHub')

export default app