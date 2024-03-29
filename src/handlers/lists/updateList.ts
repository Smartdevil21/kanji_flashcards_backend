import { Request, Response } from "express";
import { arrToObjectGeneral } from "../../utils/helpers/arrayToObject";

const Lists = require("../../models/lists.model");

export async function updateList(
    req: Request<
        { action: "add" | "deleteItem" | "changeName" | "deleteList" },
        {},
        { word: string; newName: string },
        { uid: string; ln: string }
    >,
    res: Response
) {
    try {
        const list = await Lists.findOne({
            listName: req.query.ln,
            userID: req.query.uid,
        });
        if (!list) throw new Error("List not Found!");
        switch (req.params.action) {
            case "add":
                //to add word in a list
                const listItemObj = arrToObjectGeneral(list.listItems);
                if (req.body.word in listItemObj)
                    throw new Error(
                        `Item '${req.body.word}' already exist in the list`
                    );
                const result1 = await Lists.findOneAndUpdate(
                    {
                        listName: req.query.ln,
                        userID: req.query.uid,
                    },
                    { listItems: [...list.listItems, req.body.word] },
                    { new: true }
                );
                res.status(200).json({ success: true, data: result1 });
                break;
            case "deleteItem":
                //to delete item from list
                const result2 = await Lists.findOneAndUpdate(
                    { listName: req.query.ln, userID: req.query.uid },
                    {
                        listItems: list.listItems.filter(
                            (item: string) => item !== req.body.word
                        ),
                    },
                    { new: true }
                );
                res.status(200).json({ success: true, data: result2 });
                break;
            case "changeName":
                //to rename a list
                const result3 = await Lists.findOneAndUpdate(
                    { listName: req.query.ln, userID: req.query.uid },
                    { listName: req.body.newName },
                    { new: true }
                );
                res.status(200).json({ success: true, data: result3 });
                break;
            case "deleteList":
                const result4 = await Lists.findOneAndDelete({
                    listName: req.query.ln,
                    userID: req.query.uid,
                });
                res.status(200).json({ success: true, data: result4 });
                break;
            default:
                res.status(200).json({
                    success: false,
                    message: "Value of /:action is not valid!",
                });
        }
    } catch (error) {
        res.status(400).json({ success: false, message: `${error}` });
        console.log(`Err in POST /lists/update : ${error}`);
    }
}
