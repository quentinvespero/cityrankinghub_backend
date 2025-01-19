import { Request, Response } from 'express'
import Review from '../models/review.model'
import City from '../models/city.model'

// creating a review
// the request will have to provide the city id/name
export const createReview = async (req: Request, res: Response) => {
    try {
        const review = new Review(req.body)
        
        await review.save()
        
        await City.findByIdAndUpdate(
            req.body.city,
            { $push: {$reviews} }
        )
        
        res.status(201).json(review)
    }
    catch (error) {
        res.status(500).json({message:'Error creating review', error:error})
    }
}

// get the reviews for a city
// the request will have to provide the cityId
export const getReviewsOfCity = async (req:Request, res:Response) => {
    try {
        const cityId = req.params.cityId // getting cityId from the request
        const reviewsOfTheCity = await Review.find({cityId:cityId}) // retrieving the documents in Review collection, that have the same cityId value as the one provided by the request

        res.status(200).json(reviewsOfTheCity)
    }
    catch (error) {
        res.status(500).json({message:'error fetching reviews...', error:error})
    }
}