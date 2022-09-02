import express, { Request, Response } from "express";
import sendRecoveryEmail from "../../middlewares/sendRecoveryEmail";

const User = require("../../models/user.model");

export default async function recoveryEmailHandler(
  req: Request<{}, {}, { username?: String; email?: String }, {}>,
  res: Response
) {
  try {
    const result = await User.findOne({
      $or: [{ username: req.body.username }, { email: req.body.email }],
    });
    const emailSent = await sendRecoveryEmail({
      uid: result._id,
      email: result.email,
      username: result.username,
    });
    res
      .status(200)
      .json({
        success: true,
        data: { message: "recovery Email sent successfully!" },
      });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, data: { message: "User not found!" } });
  }
}
