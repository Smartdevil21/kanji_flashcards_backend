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

export async function getKanjis(
    req: Request<{}, {}, { level: string[]; items: string[] }, {}>,
    res: Response
) {
    try {
        const response = await Kanjis.find({
            $or: [
                {
                    level: { $in: req.body.level },
                },
                { word: { $in: req.body.items } },
            ],
        });
        console.log(req.body.items, req.body.level);

        res.status(200).json({ success: true, data: response });
    } catch (error) {
        console.log(`Err in POST /kanji/filter ${error}`);
    }
}
