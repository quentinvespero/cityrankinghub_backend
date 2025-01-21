import mongoose, { Document, Schema } from "mongoose"

interface City extends Document {
    name: string
    universe: string
    location: {
        country: string
        region: string
        coordinate: {
            latitude: number
            longitude: number
        }
    }
    cityPopulation: number
    urbanAreaPopulation: number
    averageRatings: {
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
    globalRating: number
    totalReviews: number
}

const citySchema = new Schema<City>(
    {
        name: { type: String, required: true },
        universe: String,
        location: {
            country: { type: String, required: true },
            region: { type: String, required: true },
            coordinate: {
                latitude: { type: Number, required: true },
                longitude: { type: Number, required: true },
            },
        },
        cityPopulation: Number,
        urbanAreaPopulation: { type: Number, min: 0, required: true },
        averageRatings: {
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
        globalRating: { type: Number, min: -5, max: 5, required: true },
        totalReviews: { type: Number, min: 0, required: true },
    },
    { timestamps: true }
)

export default mongoose.model<City>('City', citySchema)