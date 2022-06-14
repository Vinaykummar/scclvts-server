const express = require("express");
const postgress = require("./services/postgress_service");
const router = require("./routes/routes");
var app = express();


app.use(router);

app.listen(process.env.PORT, () => {
    console.log("Server listsening at port " + process.env.PORT);
    postgress.connect();
});