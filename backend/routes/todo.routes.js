const express = require("express");
const { TodoModel } = require("../model/todo.model");
const {auth} = require("../middleware/auth.middleware")

const todoRouter = express.Router();

//1 Method :POST
todoRouter.post("/",auth,async(req,res)=>{
    try{
        const todo =new TodoModel(req.body);
        await todo.save();
        res.status(200).json({msg:"New Todo Added"});
    }
    catch(err){
        res.status(500).json(err);
    }
})



module.exports={
    todoRouter
}