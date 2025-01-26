import { RequestHandler } from 'express'
import Review from '../models/review.model'
import City from '../models/city.model'
import mongoose from 'mongoose'

// creating a review
// the request will have to provide the city id/name
export const createReview:RequestHandler = async (req, res) => {
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
        for (const propertyName in review.ratings) {
            if (propertyName in city.averageRatings) {
                // we use the review's value to update the value of the corresponding property in city.averageRatings
                city.averageRatings[propertyName as keyof typeof city.averageRatings] = 
                    (city.averageRatings[propertyName as keyof typeof city.averageRatings] * (city.totalReviews -1) + review.ratings[propertyName as keyof typeof review.ratings]) / city.totalReviews
            }
        }

        // update city.globalRating
        city.globalRating = 
            // Object.values() transform the object city.averageRatings into an array of values
            Object.values(city.averageRatings).reduce((sum,rating) => sum + rating, 0)
            / 
            Object.keys(city.averageRatings).length
        
        await city.save({session})

        // commiting the transaction, submitting it to the database, if every operations are going well
        await session.commitTransaction()
        session.endSession()

        // send the response
        res.status(201).json(review)
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating review', error: error })
    }
}

// get all the reviews submitted for a given city
// the request will have to provide the cityId
export const getCityReviews: RequestHandler = async (req, res) => {
    try {
        const { cityId } = req.params // Extract cityId from request parameters

        if (!cityId) res.status(400).json({ message: 'City ID is required' }) // Validate input

        const cityReviews = await Review.find({ cityId }) // Query reviews by cityId

        res.status(200).json(cityReviews) // Respond with the found reviews
    }
    catch (error) {
        console.error('Error fetching city reviews:', error) // Log the error for debugging
        res.status(500).json({ message: 'Error fetching reviews', error: error }) // Return error details
    }
}

export const getLatestReviews:RequestHandler = async (req, res) => {
    try {
        // fetching the 20 latest reviews
        const latestReviews = await Review.find()
            // sort by latest
            // createdAt is added to Review with timestamps option
            // -1 refers to descending order, from new to old documents. (Whereas 1 would have meant ascending, from old to new)
            .sort({createdAt:-1})
            .limit(20)

        res.status(200).json(latestReviews)
    }
    catch (error) {
        console.error('Error fetching last 20 reviews:', error) // Log the error for debugging
        res.status(500).json({ message: 'Error fetching last 20 reviews', error: error }) // Return error details
    }
}