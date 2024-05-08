const express = require("express");
const { UserModel } = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRouter = express.Router();


userRouter.post("/register", async (req, res) => {
    const {firstname,lastname,email,password}= req.body;
    try{
        bcrypt.hash(password, 5, async(err, hash)=> {
           if(err){
            res.json({err})
           }else{
            const user = new UserModel({firstname,lastname,email, password:hash})
            await user.save();
            res.status(200).json({msg: "A new user has been registered"});
           }
        });
    }catch(err){
            res.status(500).json(err);
    }
})

userRouter.post("/login",async(req,res)=>{
    const{email,password} = req.body;
    
    try{
        const user = await UserModel.findOne({email})
        bcrypt.compare(password, user.password, (err, result)=> {
            if(result){
                const token = jwt.sign({userID:user._id,firstname:user.firstname},"arsalan")
                res.status(200).json({msg:"Login Successful",token})
            }else{
                res.status(500).json({err: "Invalid Credentials"});
            }
        });
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports ={
    userRouter
}