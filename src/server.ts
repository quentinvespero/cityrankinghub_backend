import app from "./app"
import { PORT } from "./config/globalConfig"

app.listen(PORT, () => console.log(`server running on port ${PORT}`))