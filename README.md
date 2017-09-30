#### node-data-format-unification

##### install
	npm install node-date-format-unification


##### using

	var app = require("express")();
	var bodyParser = require("body-parser");
	var formatUnification = require("node-data-format-unification");
	app.use(bodyParser.urlencoded({extended: false}));
	app.use(bodyParser.json());
	app.use(formatUnification);


##### be careful
	
	rely on package-name: body-parser

##### readme

	handler:
 		1. application/json
 		2. application/x-www-form-urlencoded
 		3. multipart/form-data
 	
 	result:
 		req.body

