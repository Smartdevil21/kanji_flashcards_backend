import express, { Request, Response } from "express";
import { arrayToObjectForKanjiWordData } from "../../utils/helpers/arrayToObject";

const Kanjis = require("../../models/kanji.model");

export async function addKanjiHandler(req: Request, res: Response) {
    try {
        const kanjis = await Kanjis.find();
        const kanjisObj = arrayToObjectForKanjiWordData(kanjis);
        if (req.body.word in kanjisObj)
            throw new Error("Kanji already exists!");
        const result = await Kanjis(req.body).save();
        res.status(201).json({ success: true, data: result });
    } catch (e) {
        console.log("Err at POST /kanjis/add", e);
        res.status(400).json({ success: false, message: `${e}` });
    }
}
