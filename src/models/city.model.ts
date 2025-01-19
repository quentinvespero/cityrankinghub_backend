import { Document, Schema } from "mongoose"

interface City extends Document {
    name: string
    location: {
        country: string
        region: string
        coordinate: {
            latitude: number
            longitude: number
        }
    }
    population: number
    populationUrbanArea: number
    averageRatings: {
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

const citySchema = new Schema<City>({
    name: { type: String, required: true },
    location: {
        country: { type: String, required: true },
        region: { type: String, required: true },
        coordinate: {
            latitude: { type: Number, required: true },
            longitude: { type: Number, required: true },
        },
    },
    universe: String,
    populationIntramuros: Number,
    populationUrbanArea: { type: Number, min: 0, required: true },
    averageRatings: {
        safety: { type: Number, min: 0, max: 10, required: true },
        transport: { type: Number, min: 0, max: 10, required: true },
        culture: { type: Number, min: 0, max: 10, required: true },
        healthFacilities: { type: Number, min: 0, max: 10, required: true },
        jobOpportunities: { type: Number, min: 0, max: 10, required: true },
        weather: { type: Number, min: 0, max: 10, required: true },
        walkability: { type: Number, min: 0, max: 10, required: true },
        nightlife: { type: Number, min: 0, max: 10, required: true },
        cleanliness: { type: Number, min: 0, max: 10, required: true },
        food: { type: Number, min: 0, max: 10, required: true },
        costOfLiving: { type: Number, min: 0, max: 10, required: true },
        friendliness: { type: Number, min: 0, max: 10, required: true },
        sportsAndRecreation: { type: Number, min: 0, max: 10, required: true },
    },
    globalRating: { type: Number, min: 0, max: 10, required: true },
    totalReviews: { type: Number, min: 0, required: true },
},
    {timestamps:true}
)