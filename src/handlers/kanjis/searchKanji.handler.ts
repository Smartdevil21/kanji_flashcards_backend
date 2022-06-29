import express, { Request, Response } from "express";

const Kanjis = require("../../models/kanji.model");

export async function searchKanjiHandler(
    req: Request<{}, {}, { keyword: string }, {}>,
    res: Response
) {
    try {
        const result = await Kanjis.find({
            $or: [{ word: req.body.keyword }, { meaning: req.body.keyword }],
        });
        if (!result.length)
            return res
                .status(200)
                .json({
                    success: true,
                    data: { message: "No words Available" },
                });
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        console.log(`err in POST /kanji/search : ${error}`);
        res.status(400).json({ success: false, message: `${error}` });
    }
}
