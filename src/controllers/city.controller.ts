import { RequestHandler } from "express"
import mongoose from "mongoose"
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

        const city = new City(req.body)

        await city.save()

        res.status(201).json(city)
    }
    catch (error) {
        res.status(400).json({ error: error })
    }
}

// getting city informations and average review
export const getCityInformations: RequestHandler = async (req, res) => {
    try {
        const { cityId } = req.params

        const city = await City.findById(cityId)

        if (!city) res.status(404).json({ message: 'City not found' })

        res.status(200).json(city)
    }
    catch (error) {
        res.status(400).json({ error: error })
    }
}