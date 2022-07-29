import express, { Request, Response } from "express";
const List = require("../../models/lists.model");

export default async function getUserLists(
    req: Request<{}, {}, {lns?:string[], uid: string}, {  }>,
    res: Response
) {
    try {
        if(req.body.lns?.length){
            const result = await List.find({ userID: req.body.uid, listName:{$in:req.body.lns} })
            return res.status(200).json({ success: true, data: result });
        }
        const result = await List.find({ userID: req.body.uid });
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        console.log(`Err in GET /lists/userLists ${error}`);
        res.status(400).json({
            success: false,
            message: `Err in GET /lists/userLists ${error}`,
        });
    }
}
