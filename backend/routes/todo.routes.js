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

//2 Method GET
todoRouter.get("/", auth, async(req,res)=>{
    try{
        const notes = await TodoModel.find({userID:req.body.userID});
        res.status(200).json({notes});
    }catch(err){
        res.json(err); 
    }
})

//3 Method Patch to update
todoRouter.patch("/:todoID", auth, async(req,res)=>{
    const payload = req.body;
    const {todoID} = req.params;
    try{
        const todo= await TodoModel.findOne({_id:todoID})
        if(req.body.userID===todo.userID){
        await TodoModel.findByIdAndUpdate({_id:todoID},payload)
        res.status(200).json({msg:`The note with the ID:${todoID} has been updated`})
        }else{
            res.json({msg:"You cannot update someone else todo"})
        }
    }catch(err){
        res.json(err);
    }
})


//DELETE To delete a todo
todoRouter.delete("/:todoID", auth, async(req,res)=>{
    const {todoID} = req.params;
    try{
        const todo= await TodoModel.findOne({_id:todoID})
        if(req.body.userID===todo.userID){
        await TodoModel.findByIdAndDelete({_id:todoID})
        res.status(200).json({msg:`The note with the ID:${todoID} has been deleted`})
        }else{
            res.json({msg:"You cannot delete someone else todo"})
        }
    }catch(err){
        res.json(err);
    }
})
module.exports={
    todoRouter
}