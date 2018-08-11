// ==========DEPENDENCIES============
const express = require('express');
const app = express();
const request = require('request');

// ==========SERVING DIRECTORIES========
app.use(express.static("public"));
app.set("view engine", "ejs");

// ===========ROUTES==================
app.get("/", function(req, res){
	res.render("search");
});

app.get("/results", function(req, res) {
	let searchRequest = req.query.search;
	let url = "http://www.omdbapi.com/?s=" + searchRequest + "&apikey=thewdb";
	request(url, function(error, response, body){
		if(!error && response.statusCode == 200) {
			// res.send(body); use this code to test that you are retireving the dat before you parse
			var data = JSON.parse(body);
			// res.send(data["Search"][0]["Title"]); to test before using the ejs file
			res.render("results", {dataVar: data});
		}
	});
});



// ===========SERVER==============
app.listen(8080, function(){
	console.log("Movie App is running on Port 8080!");
	// localhost:8080
});