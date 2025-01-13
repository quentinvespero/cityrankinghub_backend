import mongoose, { Document, Schema } from "mongoose"

interface Review extends Document {
    reviewRating: {
        upvote: number
        downvote: number
        isDoomed: boolean
    }
    reviewerContext: {
        timeLivedInCityIfNewComer: string
        residencyStatus: 'tourist'|'native'|'new comer'
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

const reviewSchema = new Schema<Review>({
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
        overall: { type: Number, required: true },
        safety: { type: Number, required: true },
        transport: { type: Number, required: true },
        culture: { type: Number, required: true },
        healthFacilities: { type: Number, required: true },
        jobOpportunities: { type: Number, required: true },
        weather: { type: Number, required: true },
        walkability: { type: Number, required: true },
        nightlife: { type: Number, required: true },
        cleanliness: { type: Number, required: true },
        food: { type: Number, required: true },
        costOfLiving: { type: Number, required: true },
        friendliness: { type: Number, required: true },
        sportsAndRecreation: { type: Number, required: true },
    },
    comment: { type: String },
})

export default mongoose.model<Review>('Review', reviewSchema)