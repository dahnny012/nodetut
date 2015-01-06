function HelloWorld(){
	var express = require('express');
	var app = express();
	var CurrentDir = '/home';
	var port = process.argv[2];
	app.get(CurrentDir,function(req,res){
		res.end('Hello World!');
	});
	app.listen(port);
}



function Jade()
{
	var express = require('express');
	var app = express();
	var CurrentDir = '/home';
	var port = process.argv[2];
	var path = process.argv[3];
	
	app.set('view engine','jade');
	
	app.get(CurrentDir,function(req,res){
		res.render(path,{date:new Date().toDateString()});
	});
	app.listen(port);
}


// Do something with form data
function routeForm()
{
	var port = process.argv[2];
	var express = require('express');
	var app = express();
	var body=  require("body-parser");
	app.use(body.urlencoded({extended:false}));
	
	app.post('/form',function(req,res){
		res.send(req.body.str.split('').reverse().join(''));
	});
	app.listen(port);
}


// Serving static files
function static()
{
	var port = process.argv[2];
	var file = process.argv[3];
	var express = require('express');
	var app = express();
	
	app.use(express.static(file || path.join(__dirname,'public')));
	app.listen(port);
}

function stylish()
{
	var port = process.argv[2];
	var path = process.argv[3];
	var express = require('express');
	var app = express();
	
	app.use(express.static(path));
	app.use(require('stylus').middleware(path));
	app.listen(port);
	
}

// THis tutorial is trash.









