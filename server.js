//Dependencies
var express = require("express");
var path = require("path");
// var bodyParser = require(body-parser);

var app = express();

//initial port to use//
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/app/public'));
//Routes
require("./app/routing/htmlRoutes")(app);
require("./app/routing/apiRoutes")(app);


//Listener
app.listen(PORT, function() {
    console.log("App listening on http://localhost:" + PORT);
  });
  