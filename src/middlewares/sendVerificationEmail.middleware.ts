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

interface Props {
    email: string;
    userID: string;
}

export async function sendVerificationEmail({ email, userID }: Props) {
    try {
        if (!userID) throw new Error("User doesnot exists!");
        const mailData = {
            from: "minimalist.ic@gmail.com", // sender address
            to: `${email}`, // list of receivers
            subject: "Verification email!",
            text: "Verify your email!",
            html: `<b>Hey there! </b><br> Click the link below to verify your email!<br/><a href='http://localhost:8001/user/verify-email?uid=${userID}'><button>Verify</button></a>`,
        };
        await transporter.sendMail(mailData, (err: any, info: any) => {
            if (err) throw new Error("Error in sending verification email!");
            console.log("Verification email sent successfully!");
        });
        return {sent:true};
    } catch (error) {
        console.log(`Err in /user/verify-email : ${error}`);
        return {sent:false};
    }
}
