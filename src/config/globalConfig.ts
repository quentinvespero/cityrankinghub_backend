import dotenv from 'dotenv'

dotenv.config()

export const PORT = process.env.NODE_PORT || 'error : no port given to connect to db'

// export const MONGO_URI = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@db:${process.env.MONGO_PORT}/${process.env.MONGO_INITDB_DATABASE}?authSource=admin` || 'error : no MONGO_URI given for mongoDB uri'
export const MONGO_URI = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_INITDB_DATABASE}?authSource=admin` || 'error : no MONGO_URI given for mongoDB uri'