import {describe, it, vi} from 'vitest'

// mock creates a sort of independant "mock" version of the module review.model.ts, that will be used for the tests
vi.mock('../models/review.model.ts')

describe('Review Controller', () => {

    // create review function testing
    describe('createReview', () => {
        it('should create a new review', async () => {
            const req = { body: {  }} as Request
            const res = {
                // creating a Vitest mock function with fn()
                status:vi.fn().mockReturnThis(),
                json: vi.fn(),
            } as unknown as Response
        })
    })
})