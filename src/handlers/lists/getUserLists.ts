import express, { Request, Response } from "express";
const List = require("../../models/lists.model");

export default async function getUserLists(
    req: Request<{}, {}, {}, { uid: string }>,
    res: Response
) {
    try {
        const result = await List.find({ userID: req.query.uid });
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        console.log(`Err in GET /lists/userLists ${error}`);
        res.status(400).json({
            success: false,
            message: `Err in GET /lists/userLists ${error}`,
        });
    }
}
