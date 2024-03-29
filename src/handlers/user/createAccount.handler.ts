import express, { Express, Request, Response } from "express";
import { sendVerificationEmail } from "../../middlewares/sendVerificationEmail.middleware";

const List = require('../../models/lists.model');
const User = require("../../models/user.model");

export async function createAccountHandler(req: Request, res: Response) {
    try {
        const result = await User(req.body).save();
        const token = await result.generateToken();
        const listResult = await List({userID: result._id, listName:"Bookmarks"}).save();
        res.status(201)
            .cookie("kanji_jwt", token, {
                httpOnly: true,
            })
            .json({ success: true, data: result, t: token });
        const emailSent = await sendVerificationEmail({
            email: result.email,
            userID: result.id,
            username: result.username
        });
        console.log(emailSent);
    } catch (error) {
        console.log(`Err in POST /user/create-account: ${error}`);
        res.status(400).json({ success: false, message: `${error}` });
    }
}
