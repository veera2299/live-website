const Admin = require('../models/Admin')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const dotEnv = require('dotenv');

dotEnv.config();

const secret_key = process.env.YourCollegeName;

const adminRegister = async(req,res)=>{
    const {username, email, password} = req.body;

    try {
        const adminEmail = await Admin.findOne({email});
        if(adminEmail){
            return res.status(400).json("Email already exists")
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = new Admin({
            username,
            email,
            password : hashedPassword
        });
        await newAdmin.save();

        res.status(201).json({message: "admin registered successfully"})
        console.log("registerd")

    } catch (error) {
        console.error(error);
        res.status(500).json({error: "internal server error"})
    }
}

const adminLogin = async(req,res)=>{
    const {email, password} = req.body;

    try {
        const admin = await Admin.findOne({email});
    if(!admin){
        return res.status(401).json({error: "email not found"})
    }else if(!(await bcrypt.compare(password, admin.password))){
        return res.status(402).json({error: "password incorrect"})
    }

    const token = jwt.sign({adminId: admin._id}, secret_key, {expiresIn : "1d"})

    res.status(200).json({message:"Login successfully", token})
    console.log(email)

    } catch (error) {
        console.log(error)
        res.status(500).json({Error: "internal server error"})
    }

    


}

module.exports = {adminRegister, adminLogin}