// Modules
var fs = require("fs");
var through = require("through");
var split = require("split")

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

evenOddLines();














