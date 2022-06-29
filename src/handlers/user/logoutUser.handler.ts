import express, { Express, Request, Response } from "express";

export async function logOutUserHandler(
    req: Request<{}, {}, {}, { userID: string }>,
    res: Response
) {
    try {
        res.clearCookie("kanji_jwt").json({ success: true });
    } catch (error) {
        console.log(`Err in GET /user/logout:${error}`);
        res.status(400).json({ success: false, error: `${error}` });
    }
}
