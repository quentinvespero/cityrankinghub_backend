import { Request, Response } from 'express'
import Review from '../models/review.model'

export const createReview = async (req: Request, res: Response) => {
    try {
        const review = new Review(req.body)
        await review.save()
        res.status(201).json(review)
    }
    catch (error) {
        res.status(500).json({message:'Error creating review', error:error})
    }
}