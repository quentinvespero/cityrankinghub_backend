import { Request } from 'express'
import { describe, it, vi } from 'vitest'

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
        })
    })
})