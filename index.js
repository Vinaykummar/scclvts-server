const express = require("express");
const postgress = require("./services/postgress_service");
const router = require("./routes/routes");
var app = express();


app.use(router);

app.listen(8080, () => {
    console.log("Server listsening at port 8080");
    postgress.connect();
});