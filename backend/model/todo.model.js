const mongoose = require("mongoose");

const TodoSchema = mongoose.Schema({
    title:String,
    body:String,
    userID:String,
    firstname:String
},{
    versionKey:false
})

const TodoModel = mongoose.model("todos", TodoSchema);

module.exports =  {
    TodoModel
}