// import dotenv from 'dotenv'
// import mongoose from "mongoose"

// dotenv.config()

// const dbConnection = async () => {
//     try {
//         const uri = process.env.MONGO_URI || 'error : no MONGO_URI given for mongoDB uri'

//         await mongoose.connect(uri)
//         console.log('connection to mongoDB database OK :)')
//     }
//     catch (err) {
//         console.error('database connection failed',err)
//         throw new Error ('database connection failed')
//     }
// }

// export default dbConnection