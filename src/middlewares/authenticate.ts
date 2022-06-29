import express, { NextFunction, Request, Response } from "express";
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

export async function authenticateUser(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) throw new Error("User not Found!");
        const passwordTest = await bcrypt.compare(
            req.body.password,
            user.password
        );
        req.body.passwordTest = passwordTest;
        req.body.token = await user.generateToken();
        next();
    } catch (error) {
        console.log(`Err in authenticate middleware: ${error}`);
        res.status(400).json({ success: false, message: `${error}` });
    }
}
