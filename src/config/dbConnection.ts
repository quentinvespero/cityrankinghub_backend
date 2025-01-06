import mongoose from "mongoose"
import { MONGO_URI } from "./globalConfig"

const dbConnection = async () => {
    try {
        await mongoose.connect(MONGO_URI)
        console.log('connection to mongoDB database OK :)')
    }
    catch (err) {
        console.error('database connection failed',err)
        throw new Error ('database connection failed')
    }
}

export default dbConnection