import express from "express";
import mongoose, { Schema } from "mongoose";

const kanjiSchema: Schema = new mongoose.Schema({
    word: {
        type:String,
        unique:true
    },
    meaning: String,
    on_reading: {
        reading: String,
        example: {
            eg: String,
            meaning: String,
            pronounciation: String,
        },
    },
    kun_reading: {
        reading: String,
        example: {
            eg: String,
            meaning: String,
            pronounciation: String,
        },
    },
    level: Number,
});

const Kanjis = mongoose.model("kanji", kanjiSchema);

module.exports = Kanjis;
