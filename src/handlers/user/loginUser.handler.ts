import express, { Express, Request, Response } from "express";

export async function loginUserHandler(req: Request, res: Response) {
    try {
        if (!req.body.passwordTest) throw new Error("Password is incorrect!");
        res.status(200)
            .cookie("kanji_jwt", req.body.token, { httpOnly: true})
            .json({ success: true, data: req.body.user });
    } catch (error) {
        console.log(`Err in POST /user/login: ${error}`);
        res.status(400).json({ success: false, message: `${error}` });
    }
}
