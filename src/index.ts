require("dotenv").config();
require("./configs/db.connection");
import express, { Express, Request, Response } from "express";
import helmet from "helmet";
import bodyParser, { BodyParser } from "body-parser";
const cors = require('cors');

//require all routes
const kanjiRoute = require("./routes/kanji.route");
const userRoute = require("./routes/user.route");
const listRoute = require("./routes/lists.route");
const feedbackRoute = require("./routes/feedback.route");

//Variable declarations
const app: Express = express();
const PORT = process.env.PORT || 8001;

//Basic Middlewares
app.use(helmet());
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

//Including routes
app.use(kanjiRoute);
app.use(userRoute);
app.use(listRoute);
app.use(feedbackRoute);

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({ success: true, message: "Hello from the backend!" });
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});
