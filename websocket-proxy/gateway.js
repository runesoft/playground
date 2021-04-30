var express = require('express');
const { runInNewContext } = require('vm');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

handlers = {}

app.get('/', function (req, res) {
	res.send('ok');
});

app.get('/*', function (req,res){
    var handler = handlers[req.path];
    if(handler){
        handler(req,res);
    }else{
        res.send('no handler');
    }
})

io.on('connection', function (socket) {
    var request_id=1;
    responses = {}
    var game=undefined;
	socket.on('create', function (msg) {
        //register handler for endpoint
        //define handler
        var path= msg.path
        console.log('creating a listener for ' + path);
        handlers[path]= (req,res)=>{
            //create id for request
            var rid= request_id++;
            responses[rid] = res;
            socket.emit('request',{ 
                rid: rid, 
                headers:req.headers,
                body:req.body, 
                query:req.query
            });
            console.log(`request ${rid} processed`);
        }
	});

	socket.on('response', function (msg) {
        rhandler = responses[msg.rid]
        if(rhandler){
            console.log(`returning response ${msg.rid}`)
            rhandler.send(msg.body);
            responses[msg.id]=null;
        }else{
            console.log(`response ${msg.rid} could not be returned`)
        }
	});
});

http.listen(3000,function(){
	console.log('listening on *:3000');
});
