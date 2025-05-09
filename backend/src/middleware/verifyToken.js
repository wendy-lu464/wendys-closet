const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET_KEY

const verifyToken = (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(401).send({message: 'Invalid token'})
        }
        const decoded = jwt.verify(token, JWT_SECRET)
        if (!decoded) {
            return res.status(401).send({message: 'Invalid token'})
        }
        req.userId = decoded.userId
        req.role = decoded.role
        next()
    } catch (error) {
        msg = 'Error while verifying token'
        console.error(msg, error)
        req.status(401).send({message: msg})   
    }
}

module.exports = verifyToken