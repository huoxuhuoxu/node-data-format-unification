// test

var app = require("express")();
var bodyParser = require("body-parser");
var fu = require("../index");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fu());

app.use((req, res, next) => {
	console.log(req.body);
	res.json(req.body);
});

module.exports = app;

