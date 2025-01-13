import { Router } from 'express'
import { createReview, getReviewsOfCity } from "../controllers/review.controller"

const router = Router()

router.post('/', createReview) // posting a review
router.get('/', getReviewsOfCity) // getting reviews of a city

export default router