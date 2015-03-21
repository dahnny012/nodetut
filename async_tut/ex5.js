"use strict";


var async = require("async");
var http = require("http");
var hostname = process.argv[2],
    port = process.argv[3],
    url = 'http://' +  hostname + ':' + port;
    
function createUser(id, next) {
  var data = JSON.stringify({ "user_id": id });
  var opts = { hostname: hostname, port: port, path: "/users/create", method: "POST", headers: { "Content-Length": data.length } };
  var req = http.request(opts, function (res) {
    res.on("data", function () {});
    res.on("end", function () {
      next();
    });
  });

  req.on("error", next);

  req.write(data);
  req.end();
}


async.series([
        function(done) {
            async.times(5, function(n, next) {
                createUser(n+1,function (err) { next(err); });
            }, function() {done()})
        },
        function(done) {
             http.get(url+"/users", function(res){
                  var body = "";
                  res.on('data', function(chunk){
                    body += chunk.toString();
                  });
            
                  res.on('end', function(){
                    done(null, body);
                  });
                }).on('error', done);
        }
    ],
    function(err,results) {
        if(err) console.log(err);
        console.log(results[1]);
    });