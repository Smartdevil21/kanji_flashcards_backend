import express, { Express, Request, Response } from "express";
import { updateList } from "../handlers/lists/updateList";
import { createListHandler } from "../handlers/lists/createList.handler";

const User = require("../models/user.model");

const listRoute = express.Router();

//create List
listRoute.get("/list/create", createListHandler);

//add, delete a word or change the name of the list
listRoute.post("/list/update/:action", updateList);

module.exports = listRoute;
