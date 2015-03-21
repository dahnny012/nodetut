var async = require("async");
var http = require("http");

var url =  process.argv[2];
var count = 0;
var meerkat = ""
function truth(){
    return meerkat !== "meerkat";
}
function retry(cb){
    count++;
    http.get(url,function(res){
        var body = "";
        res.on("data",function(chunk){
            body += chunk
        })
        res.on("end",function(){
            meerkat = body;
            cb();
        })
    });
}
function complete(err){
    console.log(count);
}


async.whilst(truth,retry,complete);