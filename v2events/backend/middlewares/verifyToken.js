const Admin = require('../models/Admin');

const jwt = require('jsonwebtoken');
const dotEnv = require('dotenv');

dotEnv.config();
const secret_key = process.env.YourCollegeName

const verifyToken = async(req,res,next) => {
    const token = req.headers.token;
    
    if(!token){
        return res.status(401).json({error: "Token not found"})
    }

    try {
        const decoded = jwt.verify(token, secret_key);
        const admin = await Admin.findById(decoded.adminId);

        if(!admin){
            return res.status(404).json({error: "Admin not found"})
        }

        req.adminId = admin._id

        next();

    } catch (error) {
        console.log(error)
        return res.status(500).json({error:"Invaild Token"})
    }
}

module.exports = verifyToken;