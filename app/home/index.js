var express = require("express"),
	path = require("path");

var app = module.exports = express();

app.set("views", path.join( __dirname, "views") );

app.get("/", function( req, res, next ){
	res.render("index");
});

//set up our css render engine
var stylus = require("stylus"),
	nib = require("nib");


var pathCSS = path.join( __dirname, "public", "css" );
app.use( "/css", stylus.middleware({
	src: pathCSS,
	dest: pathCSS,
	debug: true,
	force: true,
	sourcemap:{
		inline:true
	}
}));

app.use( express.static( path.join(__dirname, "public")) );
