const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const db = require("./models");

const PORT = process.env.PORT || 8071;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

const app = express();

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

app.use(express.static("public"));
require("./routes/getRoutes")(app, db);
require("./routes/postRoutes")(app, db);

app.listen(PORT, function () {
    console.log("Listening on http://localhost:" + PORT);
});