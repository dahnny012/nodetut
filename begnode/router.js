function route(pathname,handle,response,request)
{	
	if(pathname !== "/favicon.ico")
		console.log("About to route a request for " + pathname);
	
	// We have a function for every 'Page'
	if(typeof( handle[pathname]) === 'function')
	{
		handle[pathname](response,request);
	}
	else
	{
		console.log("No request handler found for " + pathname)
		response.writeHead(404,{"Content-type":"text/plain"});
		response.write("404 Errors");
		response.end();
	}
}

exports.route = route;

