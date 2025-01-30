import mongoose, { Document, Schema } from "mongoose"

interface Review extends Document {
    reviewItselfRating: {
        upvote: number
        downvote: number
        isDoomed: boolean
    }
    reviewerContext: {
        timeLivedInCityIfNewComer: string
        residencyStatus: 'Tourist' | 'Resident' | 'New comer'
    }
    cityId: Schema.Types.ObjectId // will change it later to link it to the city collection
    universe: string,
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
        reviewItselfRating: {
            upvote: { type: Number, default: 0 },
            downvote: { type: Number, default: 0 },
            isDoomed: { type: Boolean, default: false },
        },
        reviewerContext: {
            timeLivedInCityIfNewComer: { type: String, required: false },
            residencyStatus: { type: String, required: true },
        },
        universe: String,
        cityId: { type: Schema.Types.ObjectId, ref:'City', required: true },
        ratings: {
            overall: { type: Number, min: -5, max: 5, required: true, default:0 },
            safety: { type: Number, min: -5, max: 5, required: true, default:0 },
            transport: { type: Number, min: -5, max: 5, required: true, default:0 },
            culture: { type: Number, min: -5, max: 5, required: true, default:0 },
            healthFacilities: { type: Number, min: -5, max: 5, required: true, default:0 },
            jobOpportunities: { type: Number, min: -5, max: 5, required: true, default:0 },
            weather: { type: Number, min: -5, max: 5, required: true, default:0 },
            walkability: { type: Number, min: -5, max: 5, required: true, default:0 },
            nightlife: { type: Number, min: -5, max: 5, required: true, default:0 },
            cleanliness: { type: Number, min: -5, max: 5, required: true, default:0 },
            food: { type: Number, min: -5, max: 5, required: true, default:0 },
            costOfLiving: { type: Number, min: -5, max: 5, required: true, default:0 },
            friendliness: { type: Number, min: -5, max: 5, required: true, default:0 },
            sportsAndRecreation: { type: Number, min: -5, max: 5, required: true, default:0 },
        },
        comment: { type: String },
    },
    { timestamps: true }
)

export default mongoose.model<Review>('Review', reviewSchema)