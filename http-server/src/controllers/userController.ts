import { Request, Response } from "express";
import z, { email } from "zod"
import bcrypt from "bcrypt";
import {prismaClient} from "../../../db/src/index";

const signUpSchema = z.object({
    email : z.string().email(),
    username : z.string(),
    password : z.string()
})

const signInSchema = z.object({
    email : z.string(),
    password : z.string()
})
const signup = async (req : Request,res : Response) => {
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
            msg : "Signup Successful"
        })
    }
    catch(e) {
        return res.json({
            msg : "Error pushing to the database"
        })
    }
}