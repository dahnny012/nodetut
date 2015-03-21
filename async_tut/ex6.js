var async = require("async");
var http = require("http");

var url =  process.argv[2];
var array = ['one', 'two', 'three'];

async.reduce(array,0,
  function(mem,item,cb){
    http.get(url+"?number="+item,function(res){
      var body = "";
      res.on("data",function(chunk){
        body += chunk;
      });
      res.on("end",function(){
        cb(null,mem+Number(body));
      });
    })
  },
  function(err,result){
    if(err) throw err;
    console.log(result);
  })