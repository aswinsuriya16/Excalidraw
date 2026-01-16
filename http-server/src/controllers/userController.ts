import type { Request, Response } from "express";
import {z} from "zod"
import bcrypt from "bcrypt";
import {prismaClient} from "../../../db/src/index.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../configs/config.js";

const signUpSchema = z.object({
    email : z.string().email(),
    username : z.string(),
    password : z.string()
})

const signInSchema = z.object({
    email : z.string(),
    password : z.string()
})


const signup = async (req : Request ,res : Response) => {
    const parsedBody = signUpSchema.safeParse(req.body);

    if(!parsedBody.success) {
        return res.json({
            msg : "Invalid Format"
        })
    }

    const {username,password,email} = parsedBody.data;
    const hashPassword = await bcrypt.hash(password,10);

    try {
        const user = await prismaClient.user.create({
            data : {
                username,password : hashPassword , email
            }
        })

        return res.json({
            msg : "Signup Successful",
            user : {
                id : user.id,
                email : user.email,
                username : user.username
            }
        })
    }
    catch(e) {
        return res.json({
            msg : "Error pushing to the database"
        })
    }
}

const signin = async(req : Request, res : Response)=>{
    const parsedBody = signInSchema.safeParse(req.body);
    if(!parsedBody.success) {
        return res.json({
            msg : "Invalid Credentials!"
        })
    }

    const {email,password} = parsedBody.data;

    try {
        const user = await prismaClient.user.findUnique({
            where : {
                email : email
            }
        })
        //console.log(user)
        if(!user) {
            return res.json({
                msg : "Email doesn't exist!"
            })
        }

        const passCheck = await bcrypt.compare(password,user.password);
        
        if(!passCheck) {
            return res.json({
                msg : "Incorrect Password!"
            })
        }

        const token = jwt.sign({
            userId : user.id,
            email : user.email
        },JWT_SECRET ?? "secretkey",{
            expiresIn : "24h"
        })


        return res.json({
            msg : "Signin Successful !",
            token,
            user : {
                id : user.id,
                email : user.email,
                username : user.username
            }
        })

    }
    catch(e) {
        return res.json({
            msg : "Error while fetching from the DB"
        })
    }
}
export {signup,signin}