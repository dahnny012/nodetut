// Modules
var fs = require("fs");
var through = require("through");
var split = require("split");
var concat = require("concat-stream");
var http = require("http");
var socket = require("websocket-stream");
var trumpet = require("trumpet");
var duplex = require("duplexer");
var combine = require("stream-combiner");
var zlib = require('zlib');
var crypto = require("crypto");

// Stream A File to stdout
function HowToStreamBasic(){
	var file = process.argv[2];

	var stream = fs.createReadStream(file);

	stream.pipe(process.stdout);
}


// Pipe Stdin to Stdout
function pipeStream()
{
	process.stdin.pipe(process.stdout);
}


function transformStream()
{
	var tr = through(
	function write(buf)
	{
		this.queue(buf.toString().toLocaleUpperCase());
	});

	
	process.stdin.pipe(tr).pipe(process.stdout);
}


function evenOddLines()
{
	var tr = through(
	function write(buf)
	{
		if(this.parity){
			this.queue(buf.toString().toLowerCase() + "\n")
			this.parity = 0;
		}
		else{
			this.queue(buf.toString().toUpperCase() + "\n")
			this.parity = 1;
		}
	})
	tr.parity = 1;
	;
	process.stdin.pipe(split()).pipe(tr).pipe(process.stdout);
}

function reverseConcat()
{
	process.stdin.pipe(concat(function (data) {
		var obj = data.toString();
		obj = obj.split("").reverse().join("");
		console.log(obj);
	}))
}

function httpServer()
{
	var port = process.argv[2];
	
	http.createServer(function(req,res){
		if(req.method == "POST")
		{
			req.pipe(through(
			function write(buf){
				this.queue(buf.toString().toUpperCase());
			})).pipe(res);		
		}
		else
		{
			res.end()
		}
	}).listen(port);
}

function httpClient()
{
	var request = require("request");
	var local = "http://localhost:8000";
	var post = request.post(local);
	process.stdin.pipe(post);
	post.pipe(process.stdout);
}


function websockets()
{
	var stream = socket("ws://effect-victor.codio.io:8000/");
	stream.end("hello\n");
}

function htmlStream()
{
	var tr = trumpet();
	
	//Captures .loud elements and messes with it and restreams it.
	var capture = tr.select(".loud").createStream();
	stream.pipe(through(function(buf){
		this.queue(buf.toString().toUpperCase());
	})).pipe(capture);
	
	process.stdin.pipe(tr).pipe(process.stdout);
}

function duplexer(){
	module.exports = function(cmd,args){
		var spawn = require("child_process").spawn;
		var child = spawn(cmd,args)
		return duplex(child.stdin,child.stdout);
	}
}

function duplex_redux(){
	module.exports = function(counter){
		var count = {};
		return  duplex(through(write,end),counter)
		function write(buf)
		{
			country = buf.country;
			if(count[country] == undefined){
				count[country] = 1;
			}
			else{
				count[country]++;	
			}
		}
		function end()
		{
			counter.setCounts(count);
		}
	}
}


function JSONparseGzip(){
	module.exports = function(){
		var grouper = through(write,end);
		var list = {};
		var current;
		function write(buffer)
		{
			if(buffer === 0) return;
			buffer = JSON.parse(buffer);
			if(buffer.type === "genre")
			{
				if(current != undefined)
				{
					this.queue(JSON.stringify(current) + "\n");
				}
				current = {name:buffer.name,books:[]}; 
			}
			else{
				if(current != undefined)
				{
					current.books.push(buffer.name);
				}
			}
		}
		
		// last line
		function end(buffer)
		{
			if(current)
			{
				this.queue(JSON.stringify(current) + "\n");
			}
			this.queue(null);
		}

		return combine(grouper,zlib.createGzip());
	};
};




function decrypt(){

	var passphrase = process.argv[2];
	var stream = crypto.createDecipher('aes256',passphrase);
	process.stdin.pipe(stream).pipe(process.stdout);
}


function Secretz()
{
	var password =
}





























