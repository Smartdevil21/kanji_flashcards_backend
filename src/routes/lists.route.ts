import express, { Express, Request, Response } from "express";
import { updateList } from "../handlers/lists/updateList";
import { createListHandler } from "../handlers/lists/createList.handler";
import getUserLists from "../handlers/lists/getUserLists";
import getAllKanjisOfList from "../handlers/lists/getAllKanjisOfList";

const User = require("../models/user.model");

const listRoute = express.Router();

//get all the lists details created by user
listRoute.get("/list/userLists", getUserLists);

//get all the details of items in list array
listRoute.post("/list/items", getAllKanjisOfList);

//create List
listRoute.get("/list/create", createListHandler);

//add, delete a word or change the name of the list
listRoute.post("/list/update/:action", updateList);

module.exports = listRoute;
