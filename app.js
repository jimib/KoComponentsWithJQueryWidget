var express = require("express"),
	path = require("path");

var app = express();

app.set("view engine", "jade");

app.use( require("./app/home") );
app.use( express.static( path.join(__dirname, "public")) );


app.listen(4000);