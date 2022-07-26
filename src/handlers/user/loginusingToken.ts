import express, { Request, Response } from "express";

const jwt = require("jsonwebtoken");
const User = require("../../models/user.model");

export async function loginUsingToken(
    req: Request<{}, {}, {}, { t: string }>,
    res: Response
) {
    try {
        const uid = await jwt.verify(req.query.t, process.env.JWT_KEY);
        const result = await User.findOne({ _id: uid });
        if (!result) throw new Error("User not found!");
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: `User not found!` });
    }
}
