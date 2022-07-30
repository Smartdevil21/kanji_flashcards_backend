import express, { Express, Request, Response } from "express";
import { addKanjiHandler } from "../handlers/kanjis/addKanji.handler";
import { getKanjis, getkanjisByLevelHandler } from "../handlers/kanjis/getKanjisByFilter";
import { searchKanjiHandler } from "../handlers/kanjis/searchKanji.handler";
import { getAllKanjisHandler } from "../handlers/kanjis/getAllKanjis";

const kanjiRoute = express.Router();

//to get kanjis by levels
kanjiRoute.get("/kanjis", getkanjisByLevelHandler);

//to add kanjis
kanjiRoute.post("/kanjis/add", addKanjiHandler);

//get a word by meaning, romaji, kanji or anything
kanjiRoute.post("/kanjis/search", searchKanjiHandler);

//get all kanjis on the basis of levels provided and kanjiArr provided
kanjiRoute.post('/kanjis/filter', getKanjis)

//get all the kanji entries' property
kanjiRoute.get('/kanjis/all', getAllKanjisHandler);

module.exports = kanjiRoute;
