// Modules
var fs = require("fs");
var through = require("through");
var split = require("split");
var concat = require("concat-stream");
var http = require("http");
var socket = require("websocket-stream");

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
	var stream = socket("ws://localhost:8000");
	stream.end("hello\n");
}

websockets();


