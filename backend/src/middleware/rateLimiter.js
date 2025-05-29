import ratelimit from '../config/upstash.js'

const rateLimiter = async(req , res, next)=> {
    try {
        const { success } = await ratelimit.limit('my-limit-key') // Ususally user IP or user ID should be used here

        if(!success) {
            return res.status(429).json({
                message: 'Too many requests, please try again later.'
            })
        }

        next()
    } catch (error) {
        console.error('Rate limiter error:', error)
        next(error)
    }
}

export default rateLimiter