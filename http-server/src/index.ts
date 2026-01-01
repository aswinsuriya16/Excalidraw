import express from "express";
import {z} from "zod";
import {jwt} from "jsonwebtoken";

const app = express();

app.use(express.json());

const signupSchema = z.object({
    email :z.email(),
    password : z.string(),
    username : z.string()
})

const signinSchema = z.object({
    email : z.string(),
    password : z.string()
})


app.post("/signup",(req,res)=>{
    const parsedBody = signupSchema.safeParse(req.body);

    if(!parsedBody.success) {
        return res.status(400).json({
            msg : "Ivalid format"
        })
    }

    // console.log(parsedBody.data);

    const {username,password,email} = parsedBody.data;

});

app.post("/signin",(req,res)=>{
    const parsedBody = signinSchema.safeParse(req.body);

    if(!parsedBody.success) {
        return res.json({
            msg : "Invalid format"
        })
    }

    const {email,password} = parsedBody.data;

    
})

app.listen(3000,()=>{
    console.log("Port running on 3000");
})