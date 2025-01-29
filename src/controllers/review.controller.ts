import { RequestHandler } from 'express'
import Review from '../models/review.model'
import City from '../models/city.model'
import mongoose from 'mongoose'

// creating a review
// the request will have to provide the city id/name
// ----- NOTE 270125 : giving up session/transaction for now, since it brings too much complexity (having to set up a mongo replica set), will bring it back later perhaps
export const createReview: RequestHandler = async (req, res) => {
    // starting a session
    // const session = await mongoose.startSession()

    // starting a transaction within that session.
    // its purpose is to group the operations inside it and then be able to rollback if ones fail
    // session.startTransaction()

    try {
        // extracting cityName and region from req.body and set them as const
        // we also extract reviewItselfRating, to exclude it from the response
        const { cityName, region, reviewItselfRating, ...reviewData } = req.body

        // searching the city document having the name and region from the request
        const city = await City.findOne({
            name: cityName,
            'location.region': region
        }) // here, adding the session at the end while referring to the session object previously created makes it part of the transaction
        // }).session(session) // here, adding the session at the end while referring to the session object previously created makes it part of the transaction

        if (!city) throw new Error('City not found')

        // creating and saving the review document in the review collection
        // here we gather all data from reviewData, as well as setting the value of cityId's property, that will store the _id of the city
        const review = new Review({ ...reviewData, cityId: city._id })

        // save the review object, as part of the context of the session.
        // ({session}) tells mongoDB to isolate the operations performed within the session, until it's fully completed
        // await review.save({ session })
        await review.save()

        // increasing the totalReviews value for each review added for a city
        city.totalReviews += 1

        // -------- info --------
        // since the const "city" is being part of the transaction
        // (with the addition of .session(session) at the end),
        // the 2 operations below are being performed within it
        // -------- info --------

        // update averageRatings
        // below, we are iterating on the keys of the object review.ratings.
        // Instead of doing "const property in review.ratings, which would iterate over all the elements of the Review object, including some mongoose stuff"
        for (const property of Object.keys(review.ratings)) {

            // we use the review's rating property value to update the value of the corresponding property in city.averageRatings
            city.averageRatings[property as keyof typeof city.averageRatings] =

                // below, to calculate the average, we first need to addition every reviews marks, and then divide this big number with the total amount of reviews
                // So, since we don't have the whole history of marks, we multiply the value of the property with the total amount of reviews given
                // we substract the current review in the total, with -1 (if there is already at least 1 review)
                // then, to the total amount of review, we add our review
                (
                    city.averageRatings[property as keyof typeof city.averageRatings]
                    // in the line below, we just check (in the case where there is no reviews yet) 
                    // that the total of reviews is at least 1, before substracting 1
                    // otherwise if total review is equal to 0, it would lead to -1
                    * (city.totalReviews > 1 ? city.totalReviews - 1 : 0)
                    + review.ratings[property as keyof typeof review.ratings]
                )
                // and finally, we divide it with the total of reviews, accounting the one we've just given this time
                / city.totalReviews
        }

        // update city.globalRating
        city.globalRating =
            // Object.values() is used to get the values of an object and turn them into an array of values, from the object city.averageRatings
            // then reduce() is used to iterate over the array of values. 
            // Each values will be added one after the other and they will be accumulated into totalRatingValues. 
            // The initial value from where the accumulattion will start is 0, as shown with the ", 0" at the end
            Object.values(city.averageRatings).reduce((totalRatingValues, ratingValue) => totalRatingValues + ratingValue, 0)
            /
            Object.keys(city.averageRatings).length // counting the amount of keys in averageRatings (14)

        // // await city.save({ session })
        await city.save()

        // commiting the transaction, submitting it to the database, if every operations are going well
        // await session.commitTransaction()
        // session.endSession()

        // send the response
        res.status(201).json(reviewData)
    }
    catch (error) {
        // session.abortTransaction()
        // session.endSession()
        console.error('Error creating city review:', error) // Log the error for debugging
        res.status(500).json({ message: 'Error creating review', error: error })
    }
}

// get all the reviews submitted for a given city
// the request will have to provide the cityId
export const getCityReviews: RequestHandler = async (req, res) => {
    try {
        const { name, region } = req.query // Extract cityId from request's url query parameters

        const city = await City.findOne({
            name,
            'location.region': region
        })

        if (!city) res.status(400).json({ message: 'City ID is required' }) // Validate input

        const cityReviews = await Review.find({ cityId: city?._id }) // Query reviews by cityId

        res.status(200).json(cityReviews) // Respond with the found reviews
    }
    catch (error) {
        console.error('Error fetching city reviews:', error) // Log the error for debugging
        res.status(500).json({ message: 'Error fetching reviews', error: error }) // Return error details
    }
}

export const getLatestReviews: RequestHandler = async (req, res) => {
    try {
        // fetching the 20 latest reviews
        const latestReviews = await Review.find()
            // sort by latest
            // createdAt is added to Review with timestamps option
            // -1 refers to descending order, from new to old documents. (Whereas 1 would have meant ascending, from old to new)
            .sort({ createdAt: -1 })
            .limit(20)

        res.status(200).json(latestReviews)
    }
    catch (error) {
        console.error('Error fetching last 20 reviews:', error) // Log the error for debugging
        res.status(500).json({ message: 'Error fetching last 20 reviews', error: error }) // Return error details
    }
}