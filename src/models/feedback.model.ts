import express from "express";
import mongoose, { model, Schema } from "mongoose";

const feedbackSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
});

const Feedback = mongoose.model("feedback", feedbackSchema);

module.exports = Feedback;
