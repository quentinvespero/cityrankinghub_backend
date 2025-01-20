import mongoose, { Document, Schema } from "mongoose"

interface Review extends Document {
    reviewRating: {
        upvote: number
        downvote: number
        isDoomed: boolean
    }
    reviewerContext: {
        timeLivedInCityIfNewComer: string
        residencyStatus: 'tourist' | 'native' | 'new comer'
    }
    cityId: string // will change it later to link it to the city collection
    ratings: {
        overall: number
        safety: number
        transport: number
        culture: number
        healthFacilities: number
        jobOpportunities: number
        weather: number
        walkability: number
        nightlife: number
        cleanliness: number
        food: number
        costOfLiving: number
        friendliness: number
        sportsAndRecreation: number
    }
    comment: string
}

const reviewSchema = new Schema<Review>(
    {
        reviewRating: {
            upvote: { type: Number, default: 0 },
            downvote: { type: Number, default: 0 },
            isDoomed: { type: Boolean, default: false },
        },
        reviewerContext: {
            timeLivedInCityIfNewComer: { type: String, required: false },
            residencyStatus: { type: String, required: true },
        },
        cityId: { type: String, required: true },
        ratings: {
            overall: { type: Number, min: -5, max: 5, required: true },
            safety: { type: Number, min: -5, max: 5, required: true },
            transport: { type: Number, min: -5, max: 5, required: true },
            culture: { type: Number, min: -5, max: 5, required: true },
            healthFacilities: { type: Number, min: -5, max: 5, required: true },
            jobOpportunities: { type: Number, min: -5, max: 5, required: true },
            weather: { type: Number, min: -5, max: 5, required: true },
            walkability: { type: Number, min: -5, max: 5, required: true },
            nightlife: { type: Number, min: -5, max: 5, required: true },
            cleanliness: { type: Number, min: -5, max: 5, required: true },
            food: { type: Number, min: -5, max: 5, required: true },
            costOfLiving: { type: Number, min: -5, max: 5, required: true },
            friendliness: { type: Number, min: -5, max: 5, required: true },
            sportsAndRecreation: { type: Number, min: -5, max: 5, required: true },
        },
        comment: { type: String },
    },
    { timestamps: true }
)

export default mongoose.model<Review>('Review', reviewSchema)