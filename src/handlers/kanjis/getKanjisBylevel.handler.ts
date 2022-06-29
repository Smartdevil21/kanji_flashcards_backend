import express, { Request, Response } from "express";
const Kanjis = require("../../models/kanji.model");

export async function getkanjisByLevelHandler(
    req: Request<{}, {}, {}, { level: number }>,
    res: Response
) {
    try {
        if (!req.query.level) throw new Error("Level required!");
        const result = await Kanjis.find({ level: req.query.level });
        res.status(200).json({
            success: true,
            level: req.query.level,
            data: result,
        });
    } catch (e) {
        console.log("Err at GET /kanji: ", e);
        res.status(400).json({ success: false, message: `${e}` });
    }
}
