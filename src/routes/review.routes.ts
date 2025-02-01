import { Router } from 'express'
import { createReview, getCityReviews, getLatestReviews } from '../controllers/review.controller'

const router = Router()

// route to create a review for a city
router.post('/create', createReview)

// get the 20 last reviews, no matter the city
router.get('/latest', getLatestReviews)

// route to get all the reviews for a specific city
router.get('/', getCityReviews)

export default router