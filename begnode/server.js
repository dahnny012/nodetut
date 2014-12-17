var http = require('http');
var url = require('url');


function start(route,handle){
	function onRequest(request,response)
	{
		var pathname = url.parse(request.url).pathname;
		if(pathname !== '/favicon.ico')
			console.log("Request for " + pathname + " recieved.");
			route(pathname,handle,response,request);
		
	}

	http.createServer(onRequest).listen(8080);
	console.log("Server has started")
}

exports.start = start;

