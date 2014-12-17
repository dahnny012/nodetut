//var exec = require("child_process").exec;
var querystring = require("querystring");
var fs = require('fs');
var formidable = require('formidable');

function start(response)
{
	console.log("Request handler 'start' was called.");
	
	var body = getUploadBody();
     		   

	response.writeHead(200,{"Content-type":"text/html"});
	response.write(body);
	response.end();   
}

function upload(response,request)
{
	console.log("Request handler 'upload' was called")
	
	var form = new formidable.IncomingForm();
	console.log("About to Parse");
	form.parse(request,function(error,fields,files){
		fs.rename(files.upload.path,"/tmp/test.png",function(error){
			if(error)
			{
				fs.unlink("/tmp/test.png");
				fs.rename(files.upload.path,"/tmp/test.png");
			}
		});
		response.writeHead(200,{"Content-Type": "text/html"});
		response.write("recieved image: <br/>");
		response.write("<img src='/show'/>")
		response.end();
		
	});
}

function show(response)
{
	console.log("Request handler 'show' was called");
	response.writeHead(200,{"Content-Type": "image/png"});
	fs.createReadStream("/tmp/test.png").pipe(response);
}


exports.start = start;
exports.upload = upload;
exports.show = show;


// Helper functions
function getTextBody()
{
	return  '<html>'+
     		   '<head>'+
     		   '<meta http-equiv="Content-Type" content="text/html; '+
     		   'charset=UTF-8" />'+
     		   '</head>'+
     		   '<body>'+
     		   '<form action="/upload" method="post">'+
     		   '<textarea name="text" rows="20" cols="60"></textarea>'+
     		   '<input type="submit" value="Submit text" />'+
     		   '</form>'+
     		   '</body>'+
     		   '</html>';
}


function getUploadBody()
{
	return  '<html>'+
     		   '<head>'+
     		   '<meta http-equiv="Content-Type" content="text/html; '+
     		   'charset=UTF-8" />'+
     		   '</head>'+
     		   '<body>'+
     		   '<form action="/upload" method="post" enctype="multipart/form-data">'+
			   '<input type="file" name="upload" />'+
     		   '<input type="submit" value="Upload File" />'+
     		   '</form>'+
     		   '</body>'+
     		   '</html>';
}

