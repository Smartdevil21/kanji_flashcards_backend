import express, {Request, Response} from 'express';
 const User = require('../../models/user.model');
 const bcrypt = require("bcryptjs");

 export default async function updateInfo(req:Request<{},{},{uid:string, updatedPass:string},{}>, res:Response){
    try {
        console.log(req.body);
        let user = await User.findOne({_id:req.body.uid});
        
        user.password = await bcrypt.hash(req.body.updatedPass, 10);
        console.log("h1");
        const result = await User.findOneAndUpdate({_id:req.body.uid},user);
        res.status(200).json({succes:true, data:{message:"Information updated successfully!"}})
    } catch (error) {
        console.log(`${error}`);
        res.status(400).json({success:false, data:{message:"Something went wrong!"}})
    }
 }