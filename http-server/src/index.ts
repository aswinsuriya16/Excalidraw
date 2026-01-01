import express from "express";

const app = express();

app.use(express.json());

app.post("/signup",(req,res)=>{

});

app.listen(3000,()=>{
    console.log("Port running on 3000");
})