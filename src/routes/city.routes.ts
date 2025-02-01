import { Router } from "express";
import { createCity, getCityInformations } from "../controllers/city.controller";

const router = Router()

// create a new city
router.post('/create',createCity)

// getting city informations and average review
router.get('/', getCityInformations)

export default router