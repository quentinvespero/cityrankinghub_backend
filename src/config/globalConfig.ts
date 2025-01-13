import dotenv from 'dotenv'
import express from 'express'

dotenv.config()

export const PORT = process.env.NODE_PORT || 'error : no port given to connect to db'

export const MONGO_URI = `mongodb://${process.env.MONGO_APPUSER_USERNAME}:${process.env.MONGO_APPUSER_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_INITDB_DATABASE}` || 'error : no MONGO_URI given for mongoDB uri'

// export const router = express.Router