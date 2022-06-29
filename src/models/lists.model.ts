import mongoose, { model } from "mongoose";

const listSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true,
    },
    listName: {
        type: String,
        required: true,
    },
    listItems: [{ type: String }],
});

const Lists = mongoose.model("list", listSchema);

module.exports = Lists;
