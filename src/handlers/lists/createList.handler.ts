import { Request, Response } from "express";

const Lists = require("../../models/lists.model");

export async function createListHandler(
    req: Request<{}, {}, {}, { userID: string; listName: string }>,
    res: Response
) {
    try {
        const result = await Lists({
            userID: req.query.userID,
            listName: req.query.listName,
        }).save();
        res.status(201).json({ success: true, data: result });
    } catch (error) {
        res.status(400).json({ success: false, message: `${error}` });
        console.log(`Err in GET /lists/create : ${error}`);
    }
}
