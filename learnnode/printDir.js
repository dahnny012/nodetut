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



function printDir(dir,filter,cb)
{
	var path = dir;
	var ext = filter;
	var fs = require('fs');
	
	fs.readdir(path,function(err,list){
		if(err) return cb(err);
		
		filtered = list.filter(function(file){
			return file.indexOf("." + ext) > -1;
		});
		return cb(null,filtered);
	});


}

module.exports = printDir;
