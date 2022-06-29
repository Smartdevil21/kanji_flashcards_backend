import express, { Express, Request, Response } from "express";
import { addKanjiToListHandler } from "../handlers/lists/addKanjiToList.handler";
import { createListHandler } from "../handlers/lists/createList.handler";

const User = require("../models/user.model");

const listRoute = express.Router();

//create List
listRoute.get("/list/create", createListHandler);

//add, delete a word or change the name of the list
listRoute.post("/list/update/:action", addKanjiToListHandler);

module.exports = listRoute;
