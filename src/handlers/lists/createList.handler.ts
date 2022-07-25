import { Request, Response } from "express";

const Lists = require("../../models/lists.model");

export async function createListHandler(
    req: Request<{}, {}, {}, { uid: string; ln: string }>,
    res: Response
) {
    try {
        console.log(req.query.ln, req.query.uid);
        const result = await Lists({
            userID: req.query.uid,
            listName: req.query.ln,
        }).save();
        res.status(201).json({ success: true, data: result });
    } catch (error) {
        res.status(400).json({ success: false, message: `${error}` });
        console.log(`Err in GET /lists/create : ${error}`);
    }
}
