 // Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
// Requiring our Note and Article models
var note = require("./models/note.js");
var article = require("./models/article.js");
// Our scraping tools
var request = require("request");
var cheerio = require("cheerio"); 
// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;
// Set Handlebars
var exphbs = require("express-handlebars");
var Handlebars = require("handlebars");

Handlebars.registerHelper("inc", function(value, options) {
	return parseInt(value) + 1;
}); 

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// Initialize Express
var app = express();

// Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

// Make public a static dir
app.use(express.static("public"));

//Routes ----------------------------------------------------
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

const PORT = process.env.PORT || 3000;

// Database configuration with mongoose
mongoose.connect("mongodb://localhost/voguearticles");
var db = mongoose.connection;
// mongodb://heroku_9tq7nf39:nr77kn3nlcsk6p68pqe0ue4q1s@ds143181.mlab.com:43181/heroku_9tq7nf39

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// Listen on port 3000
app.listen(PORT, function() {
  console.log("App running on port 3000!");
});

