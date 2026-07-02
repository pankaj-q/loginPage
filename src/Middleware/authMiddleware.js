import jwt from 'jsonwebtoken'
import  User from '../models/userModel.js'

const verifyJWT = async (req, res, next) => {
    try {
       
        const token = req.headers.authorization?.split(" ")[1];
        if(!token) {
           return res.status(401).json({
                message: "Access token required"
            });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded._id).select("-password -refreshToken")
    
    
        if(!user){
           return res.status(401).json({
                message: "invalid access token"
            })
            req.user = user;
            next();
        }
    } catch (error) {
        console.log("invalid Access Token",error)
        return res.status(401).json({
            message: "Invalid access Token"
        });
    }
}

export default verifyJWT;