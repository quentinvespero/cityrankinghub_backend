import { RequestHandler } from "express"
import City from '../models/city.model'

// create a new city
export const createCity: RequestHandler = async (req, res) => {
    try {
        const { name, location } = req.body

        // Check if the city already exists in the same region
        const existingCity = await City.findOne({
            name,
            'location.region': location.region
        })

        // return error if existingCity exist
        if (existingCity) res.status(400).json({ message: 'City already exists in this region' })

        // gathering the relevant fields, while excluding totalReviews and averageRatings
        const { totalReviews, averageRatings, ...cityData } = req.body

        const city = new City(cityData)

        await city.save()

        res.status(201).json(cityData)
    }
    catch (error: any) {
        res.status(400).json({ message: 'Error creating city', error: error.message || 'an unexpected error occured' })
    }
}

// getting city informations and average review
// the request must contains the name and region/country
export const getCityInformations: RequestHandler = async (req, res) => {
    try {
        const { name, region, country } = req.query

        const city = await City.findOne({
            name,
            // 'location.region':region,
            'location.country':country
        })
            .select('-__v')

        if (!city) res.status(404).json({ message: 'City not found' })

        res.status(200).json(city)
    }
    catch (error) {
        res.status(400).json({ error: error })
    }
}