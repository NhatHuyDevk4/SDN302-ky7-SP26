import { rateLimit } from 'express-rate-limit'

export const limiter = rateLimit({
    windowMs: 30 * 1000, // 30 seconds
    limit: 3, // giới hạn mỗi IP chỉ được gửi tối đa 10 yêu cầu trong khoảng thời gian windowMs
    standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
    // store: ... , // Redis, Memcached, etc. See below.
    message: {
        status: 429,
        message: "Bạn đã gửi quá nhiều yêu cầu trong một khoảng thời gian ngắn. Vui lòng thử lại sau.",
    },
})

export const userLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    limit: 5, // giới hạn mỗi IP chỉ được gửi tối đa 5 yêu cầu trong khoảng thời gian windowMs
    standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
    keyGenerator: (req) => req.user ? req.user.id : req.ip, // Sử dụng user ID nếu đã đăng nhập, nếu không thì sử dụng IP Ip ở đây là IP của client gửi yêu cầu
    message: {
        status: 429,
        message: "Bạn đã gửi quá nhiều yêu cầu trong một khoảng thời gian ngắn. Vui lòng thử lại sau.",
    },
})