import mongoose, { Schema } from "mongoose";
import { NextFunction } from "express";
import * as validator from "validator";

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema: Schema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        trim: true,
        required: true,
    },
    emailVerified: {
        type: Boolean,
        default: false,
    },
    email: {
        type: String,
        validate(email: string) {
            if (!validator.isEmail(email)) {
                throw new Error("Email is Invalid!");
            }
        },
        unique: true,
        trim: true,
    },
    lists: [
        {
            listName: String,
            listItems: [String],
        },
    ],
    password: {
        type: String,
        required: true,
    },
});

userSchema.methods.generateToken = async function () {
    try {
        const resultantToken = await jwt.sign(
            { _id: this._id.toString() },
            process.env.JWT_KEY
        );
        await this.save();
        return resultantToken;
    } catch (error) {
        console.log(`Token generation error: ${error}`);
    }
};

userSchema.pre("save", async function (next) {
    try {
        if (this.isModified("password")) {
            this.password = await bcrypt.hash(this.password, 10);
        }
        next();
    } catch (error) {
        console.log(`User.save() error: ${error}`);
    }
});

const User = mongoose.model("user", userSchema);

module.exports = User;
