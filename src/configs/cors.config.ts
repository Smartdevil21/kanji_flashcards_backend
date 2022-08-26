const cors = require("cors");

const corsOptions = {
    origin: `${process.env.CORS_ORIGIN}`,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

module.exports = cors(corsOptions);