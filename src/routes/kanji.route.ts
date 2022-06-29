import express, { Express, Request, Response } from "express";
import { addKanjiHandler } from "../handlers/kanjis/addKanji.handler";
import { getkanjisByLevelHandler } from "../handlers/kanjis/getKanjisBylevel.handler";
import { searchKanjiHandler } from "../handlers/kanjis/searchKanji.handler";

const kanjiRoute = express.Router();

//to get kanjis by levels
kanjiRoute.get("/kanjis", getkanjisByLevelHandler);

//to add kanjis
kanjiRoute.post("/kanjis/add", addKanjiHandler);

//get a word by meaning, romaji, kanji or anything
kanjiRoute.post("/kanjis/search", searchKanjiHandler);

module.exports = kanjiRoute;
