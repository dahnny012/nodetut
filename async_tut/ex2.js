var async = require("async");
var http = require("http");
var REQ1 = process.argv[2];
var REQ2 = process.argv[3];

async.series(
    {
        requestOne:function(done){
            getReq(REQ1,done);
        },
        requestTwo:function(done){
            getReq(REQ2,done);
        }
        
    },
    function(err,results){
        if(err) throw err
        console.log(results);
    });
    
    
function getReq(url,cb){
    http.get(url,function(req){
        var body = "";
        req.on("data",function(chunk){
            body += chunk;
        });
        req.on("end",function(chunk) {
            cb(null,body);
        })
    })
}
