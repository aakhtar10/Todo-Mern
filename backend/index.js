const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connection } = require("./config/db");
const {userRouter} = require("./routes/user.routes")
const {todoRouter} = require("./routes/todo.routes")

const app = express();
app.use(express.json());
app.use(cors());
app.use("/users", userRouter);
app.use("/todos",todoRouter);





app.listen(process.env.PORT,async () => {
    try{
        await connection;
        console.log("Connected to db");
        console.log(`Server is running on port ${process.env.PORT}`);
    }catch(err){
        console.log(err);
    } 
})