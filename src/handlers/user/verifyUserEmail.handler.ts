import { Request, Response } from "express";
const path = require('path');
const Users = require("../../models/user.model");

export async function verifyUserEmailHandler(
    req: Request<{}, {}, {}, { uid: string }>,
    res: Response
) {
    try {
        const result = await Users.findOneAndUpdate(
            { _id: req.query.uid },
            { emailVerified: true },
            { returnNewDocument: true }
        );
        if (!result) throw new Error("User not found!");
        // res.status(200).sendFile(path.join(__dirname, "/index.html"));
        res.status(200).send("Email verified Successfully!");
    } catch (error) {
        console.log(`Err in GET /user/verify-email : ${error}`);
        res.status(400).json({ success: false, data: { message: `${error}` } });
    }
}
