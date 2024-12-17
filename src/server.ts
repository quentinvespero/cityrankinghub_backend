import dotenv from 'dotenv'
import app from "./app"

dotenv.config()

console.log('--------------------------------------')
console.log('--------------------------------------')
console.log('--------------------------------------')
console.log('tuuuuuuuuuuuuuuuut',process.env)
console.log('--------------------------------------')
console.log('--------------------------------------')
console.log('--------------------------------------')

const PORT = process.env.PORT || 'error : no port given to connect to db'

app.listen(PORT, () => console.log(`server running on port ${PORT}`))