import { router } from "../config/globalConfig";

router.get('/', (req:Request, res:Response) => {res.send('API is working :)')})

export 