var app = require('http').createServer(handler),
stat = require('node-static'),
mongoose = require('mongoose'),
express = require('express');
   
var fileServer = new stat.Server('./');


app.listen(8081);



function handler (request, response) {
    request.addListener('end', function () {
        fileServer.serve(request, response);
    }).resume();
}

 var io = require('socket.io').listen(app);
 io.set('log level', 1);

io.sockets.on('connection', function (socket) {
        console.log('New Connection');
      socket.on('input', function (data){
        
        socket.broadcast.emit('input', data);
      console.log("Emitting: " + data.text + " : " + data.time);        
      });
    
});

