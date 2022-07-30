import { Express, Request, Response } from "express";
const Kanji = require('../../models/kanji.model');

export async function getAllKanjisHandler(req:Request, res:Response){
    try {
        const result = await Kanji.find().limit(100);
        res.status(200).json({success:true, data:result});
    } catch (error) {
        console.log(`Err in GET /kanjis/all ${error}`);
        res.status(400).json({success:false, message:`Err in GET /kanjis/all ${error}`});
    }
}