import { Request, Response } from "express";
const Users = require("../../models/user.model");

export async function verifyUserEmailHandler(
    req: Request<{}, {}, {}, { email: string }>,
    res: Response
) {
    try {
        // const user = await Users.findOne({ email: req.query.email });
        const result = await Users.findOneAndUpdate(
            { email: req.query.email },
            { emailVerified: true },
            { returnNewDocument: true }
        );
        if (!result) throw new Error("User not found!");
        res.status(200).json({
            success: true,
            message: "Email verified successfully!",
        });
    } catch (error) {
        console.log(`Err in GET /user/verify-email : ${error}`);
        res.status(400).json({ success: false, data: { message: `${error}` } });
    }
}
