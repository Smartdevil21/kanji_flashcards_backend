import express, { Request, Response } from "express";

const Feedback = require("../models/feedback.model");

const feedbackRoute = express.Router();

feedbackRoute.post("/sendFeedback", async (req: Request, res: Response) => {
    try {
        const result = await Feedback(req.body).save();
        res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        console.log(`Err at POST /sendFeedback`);
        res.status(400).json({ success: false, message: `${error}` });
    }
});

module.exports = feedbackRoute;
