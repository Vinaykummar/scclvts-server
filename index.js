const express = require("express");
const cors = require('cors');
const postgress = require("./services/postgress_service");
const router = require("./routes/routes");
var app = express();

app.use(cors({
    origin: 'https://scclvts.web.app'
}));
app.use(router);

app.listen(process.env.PORT, () => {
    console.log("Server listsening at port " + process.env.PORT);
    postgress.connect();
});