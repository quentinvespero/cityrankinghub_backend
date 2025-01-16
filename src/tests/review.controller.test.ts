import { Request } from 'express'
import { describe, expect, it, vi } from 'vitest'
import Review from '../models/review.model'
import * as reviewController from '../controllers/review.controller'

// dummy request body to use in test
const requestBody = {
    "reviewRating": {
        "upvote": 10,
        "downvote": 2,
        "isDoomed": false
    },
    "reviewerContext": {
        "timeLivedInCityIfNewComer": "2 years",
        "residencyStatus": "new comer"
    },
    "cityId": "63e7b6f4c2a1d9b5678d1234",
    "ratings": {
        "overall": 4,
        "safety": 3,
        "transport": 5,
        "culture": -1,
        "healthFacilities": 2,
        "jobOpportunities": 3,
        "weather": 0,
        "walkability": 5,
        "nightlife": -2,
        "cleanliness": 1,
        "food": 4,
        "costOfLiving": -3,
        "friendliness": 5,
        "sportsAndRecreation": 3
    },
    "comment": "The city is fantastic for walking and exploring, but nightlife options could be better. Great healthcare and food!"
}

// mock creates a sort of independant "mock" version of the module review.model.ts, that will be used for the tests
vi.mock('../models/review.model.ts')

describe('Review Controller', () => {

    // create review function testing
    describe('createReview', () => {

        it('should create a new review', async () => {
            const req = { body: requestBody } as Request
            const res = {
                // below, the properties "status" and "json" are indicated as functions, using vi.fn()
                // so vi.fn() will create mock function, using the name given to the property
                // (in the controller, these functions looks like that : status().json() )
                // example : status() --> status: vi.fn()
                status: vi.fn().mockReturnThis(), // here, since in the controller the status() method return the Response itself, we are doing the same here, while returning This
                json: vi.fn(),
            } as unknown as Response // casting it as "unknown" first here, to avoid typescript error since before being executed, it isn't of type Response yet

            // we use the mongoose method prototype, to create a mock of the model Review, that we save
            // the whole expression is between brackets to make it all of type any
            // then we use the method mockResolvedValue to send the request
            (Review.prototype.save as any).mockResolvedValue(req.body)

            // we call the function createReview, and give it the req and res
            await reviewController.createReview(req, res)

            // expect is a method that check whether an expected condition is true. Otherwise, the tests will fail
            // 
            expect(res.status).toHaveBeenCalledWith(201)
            expect(res.json).toHaveBeenCalledWith(req.body)
        })

        it('should return an error if review creation fails', async () => {
            const req = { body: {} } as Request
            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn(),
            } as unknown as Response

            (Review.prototype.save as any).mockRejectedValue(new Error('Failed to save'))

            await reviewController.createReview(req, res)

            expect(res.status).toHaveBeenCalledWith(500)
            expect(res.json).toHaveBeenCalledWith({
                message: 'Error creating review',
                error: new Error('Failed to save'),
            })
        })
    })
})