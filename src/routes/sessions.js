import express from 'express';
import { passportCall, checkAuthorization } from '../utils/middlewares.js';
import  upload  from '../utils/uploader.js';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';

const router = express.Router();

router.get('/current',passportCall('jwt'),checkAuthorization(["ADMIN","USER"]), (req,res)=>{
    let user = req.user;
    res.send(user);
})

router.post('/register',upload.single('avatar'),passportCall('register'),(req,res)=>{
    res.send({message:"Signed up"})
})

router.post('/login',passportCall('login'),(req,res)=>{
    let user = req.user;
    let token = jwt.sign(user,config.jwt.SECRET);
    res.cookie("JWT_COOKIE",token,{
        httpOnly:true,
        maxAge:1000*60*60
    })
    res.send({status:"success",message:"Logged in"})
})

router.get('/logout',(req,res)=>{
    res.clearCookie('JWT_COOKIE')
    res.send({message:"Logged out"})
})

export default router;