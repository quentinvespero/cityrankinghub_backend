import app from "./app"

const PORT = process.env.PORT || 'error : no port given to connect to db'

app.listen(PORT, () => console.log(`server running on port ${PORT}`))