/*Baby Steps:

var sum = 0;
for(var i=2; i<process.argv.length; i++)
{
	sum += Number(process.argv[i]);
}

console.log(sum);*/

/*First Sync IO

var fs = require('fs');
var path = process.argv[2];



var buffer = fs.readFileSync(path);
var contents = buffer.toString();
var split = contents.split("\n");

console.log(split.length - 1);

*/

/*My First Async IO

var fs = require('fs');
var path = process.argv[2];
var buffer = fs.readFile(path,function(err,buffer){
	if(err) throw err;
	var contents = buffer.toString();
	var split = contents.split("\n");
	console.log(split.length - 1);
});


*/


/* Module use
var mod = require('./printDir');


mod(process.argv[2],process.argv[3],function(err,data)
{
	data.forEach(function(file){
		console.log(file);
	});
});

*/

/*No module HTTP client aggreate data
var http = require('http');
var link = process.argv[2];

var response = http.get(link,function(response){
	response.setEncoding("utf8");
	var buffer = [];
	var dataRecieved =0;
	response.on("error", function(error){
		throw error;
	})
	
	response.on("data",function(data){
		buffer.push(data);
		dataRecieved += data.length;
	})
	
	response.on("end",function(end){
		console.log(dataRecieved);
		console.log(buffer.join(""));
	})


});*/


/* BL Stream pipe http client
var http = require('http');
var link = process.argv[2];
var bl = require('bl');

var response = http.get(link,function(response){
	response.pipe(bl(function(err,data){
		if(err) throw err;
		
		data = data.toString();
		console.log(data.length);
		console.log(data);
	}));
});
*/


/*
var bl = require('bl');
var http = require('http');
var link0 = process.argv[2];
var link1 = process.argv[3];
var link2 = process.argv[4];

var done = ["","",""];
var workerDone = 0;

var response0 = http.get(link0,function(response){
	response.pipe(bl(function(err,data){
		if(err) throw err;
		data = data.toString();
		done[0] = data;
	}));
});



var response1 = http.get(link1,function(response){
	response.pipe(bl(function(err,data){
		if(err) throw err;
		data = data.toString();
		done[1] = data;
	}));
});


var response2 = http.get(link2,function(response){
	response.pipe(bl(function(err,data){
		if(err) throw err;
		data = data.toString();
		done[2] = data;
	}));
});


var stop = setInterval(
	function(){
		if(workerDone > 2)
		{
			abort();
		}
		else if (done[workerDone] != "")
		{
			console.log(done[workerDone]);
			workerDone++;
		}
	},0);


function abort()
{
	clearInterval(stop);
}

*/


var net = require('net');

























