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

// a dedicated schema for rating, so it runs a function that round up the numbers before storing them in the database
const ratingSchema = {
    type: Number,
    min:-5,
    max: 5,
    default:0,
    set: (value: number) => parseFloat(value.toFixed(4))
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
            overall: ratingSchema,
            safety: ratingSchema,
            transport: ratingSchema,
            culture: ratingSchema,
            healthFacilities: ratingSchema,
            jobOpportunities: ratingSchema,
            weather: ratingSchema,
            walkability: ratingSchema,
            nightlife: ratingSchema,
            cleanliness: ratingSchema,
            food: ratingSchema,
            costOfLiving: ratingSchema,
            friendliness: ratingSchema,
            sportsAndRecreation: ratingSchema,
        },
        globalRating: ratingSchema,
        totalReviews: { type: Number, min: 0, default: 0 },
    },
    { timestamps: true }
)

// Create a compound index on 'name' and 'location.region' to ensure uniqueness of a city name in a given region
citySchema.index({ name: 1, 'location.region': 1 }, { unique: true })

export default mongoose.model<City>('City', citySchema)