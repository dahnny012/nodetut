var async = require("async");
var http = require("http");
var REQ1 = process.argv[2];
var REQ2 = process.argv[3];



async.each([REQ1,REQ2],function(url,cb){
    return getReq(url,cb)
},
    function(err){
        if(err) console.log(err);
    })


function getReq(url,cb){
    http.get(url,function(res){
        var body = "";
        res.on("data",function(chunk){
            body += chunk;
        });
        res.on("end",function(chunk) {
            cb();
        });
    }).on("error",function(err){
        cb(err)
    })
}