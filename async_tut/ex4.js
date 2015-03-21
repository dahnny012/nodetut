var async = require("async");
var http = require("http");
var REQ1 = process.argv[2];
var REQ2 = process.argv[3];



async.map([REQ1,REQ2],function(url,cb){
    getReq(url,cb)
},
    function(err,results){
        if(err) throw err
        console.log(results);
    })


function getReq(url,cb){
    http.get(url,function(res){
        var body = "";
        res.on("data",function(chunk){
            body += chunk;
        });
        res.on("end",function(chunk) {
            cb(null,body);
        });
    }).on("error",function(err){
        cb(err)
    })
}