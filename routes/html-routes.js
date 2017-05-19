// Requiring our models
var note = require("../models/note.js");
var article = require("../models/article.js");

module.exports = function(app) {
  // GET route for all articles
  // Index to load views html
  app.get("/", function(req, res) {
  	article.find({}).then(function(dbarticle) {
  		var hbsObject = {
        articles: dbarticle
      };
        res.render("index", hbsObject);
      });
  	});
}; 