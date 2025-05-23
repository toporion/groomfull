const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1]
    console.log('Received Token:', token); // 👈 Log the token
    console.log('Token Secret:', process.env.TOKEN_SECRET); // 👈 Log the secret
    if (!token) return res.status(401).json("You are not authenticated")
    try {
        const decoded =jwt.verify(token,process.env.TOKEN_SECRET)
        req.user=decoded
        next()
    } catch (err) {
        res.status(403).json("Token is not valid")
    }
}
module.exports=verifyToken;