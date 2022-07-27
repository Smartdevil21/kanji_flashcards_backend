import express, {Request, Response} from 'express';
const Kanji = require("../../models/kanji.model");

export default async function getAllKanjisOfList(req:Request<{},{},{listArr:string[]},{}>, res:Response){
    try {
        const result = await Kanji.find({word:{$in:req.body.listArr}});
        res.status(200).json({success:true, data:result});
    } catch (error) {
        console.log(`Err in POST /list/items ${error}`);
        res.status(400).json({success:false, message: `Err in POST /list/items ${error}`})
    }
}