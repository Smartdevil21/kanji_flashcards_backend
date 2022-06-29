import mongoose from "mongoose";
const db = process.env.MONGODB_URI || "";

mongoose
    .connect(db)
    .then(() => {
        console.log("Connection succesful!");
    })
    .catch((e) => {
        console.log("Connection failed!", `Error: ${e}`);
    });
