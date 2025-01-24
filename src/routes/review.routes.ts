import express from 'express'
import { createReview, getCityReviews } from '../controllers/review.controller'

const router = express.Router()

router.post('/', createReview)
router.get('/:cityId', getCityReviews)

export default router