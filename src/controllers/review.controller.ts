import { Request, Response } from 'express'
import Review from '../models/review.model'
import City from '../models/city.model'
import mongoose from 'mongoose'

// creating a review
// the request will have to provide the city id/name
export const createReview = async (req: Request, res: Response) => {
    // starting a session
    const session = await mongoose.startSession()

    // starting a transaction within that session.
    // its purpose is to group the operations inside it and then be able to rollback if ones fail
    session.startTransaction()

    try {
        // creating and saving the review document in the review collection
        const review = new Review(req.body)

        // save the review object, as part of the context of the session.
        // ({session}) tells mongoDB to isolate the operations performed within the session, until it's fully completed
        await review.save({session})

        // finding the city
        const city = await City.findById(review.cityId).session(session) // here, at the end, adding the session make it part of the transaction
        if (!city) throw new Error('City not found')
            
        // since the const "city" is being part of the transaction, with the addition of .session(session) at the end, 
        // the 2 operations below are being performed within it

        // increasing the totalReviews value for each review added for a city
        city.totalReviews += 1

        // update averageRatings
        // below, for each properties in review.ratings
        for (const propertyName in review.ratings) {
            if (propertyName in city.averageRatings) {
                
            }
            // we use the review's value to update the value of the corresponding property in city.averageRatings
            city.averageRatings[propertyName] = (city.averageRatings[propertyName] * (city.totalReviews - 1) + review.ratings[propertyName]) / city.totalReviews
        }

        res.status(201).json(review)
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating review', error: error })
    }
}

// get the reviews for a city
// the request will have to provide the cityId
export const getReviewsOfCity = async (req: Request, res: Response) => {
    try {
        const cityId = req.params.cityId // getting cityId from the request
        const reviewsOfTheCity = await Review.find({ cityId: cityId }) // retrieving the documents in Review collection, that have the same cityId value as the one provided by the request

        res.status(200).json(reviewsOfTheCity)
    }
    catch (error) {
        res.status(500).json({ message: 'error fetching reviews...', error: error })
    }
}