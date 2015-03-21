var async = require("async");
var fs = require("fs");
var http = require("http");
var PATH = process.argv[2];


async.waterfall([
    function(cb){
    fs.readFile(PATH,function(err,data){
        if(err) throw err;
        cb(null,data.toString());
    })
    },
    function(data,cb){
        http.get(data,function(res){
            var buf = "";
          res.on('data',function(chunk){
              buf += chunk;
          });
          res.on('end',function(){
              cb(null,buf);
          });
    })}],
    function(err,res){
        if (err) throw err
        console.log(res);
    })