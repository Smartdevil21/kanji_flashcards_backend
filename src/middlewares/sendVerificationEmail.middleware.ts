import { Request, Response, NextFunction } from "express";
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    port: Number(process.env.SMTP_PORT), // true for 465, false for other ports
    host: process.env.SMTP_HOST,
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
    },
    secure: true,
});

export async function sendVerificationEmail(
    req: Request<{}, {}, { email: string; userID: string }, {}>,
    res: Response,
    next: NextFunction
) {
    try {
        if (!req.body.email) throw new Error("Email doesnot exists!");
        const mailData = {
            from: "minimalist.ic@gmail.com", // sender address
            to: `${req.body.email}`, // list of receivers
            subject: "Verification email!",
            text: "Verify your email!",
            html: `<b>Hey there! </b><br> Click the link below to verify your email!<br/><a href='http://localhost:8001/user/verify-email?email=${req.body.email}'><button>Verify</button></a>`,
        };
        await transporter.sendMail(mailData, (err: any, info: any) => {
            if (err) throw new Error("Error in sending verification email!");
            console.log("Verification email sent successfully!");
        });
        next();
    } catch (error) {
        console.log(`Err in /user/verify-email : ${error}`);
        res.status(400).json({ success: false, data: { message: `${error}` } });
    }
}
