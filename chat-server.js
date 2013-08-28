var app = require('http').createServer(handler),
stat = require('node-static'),
mongoose = require('mongoose'),
express = require('express'),
fileServer = new stat.Server('./');

app.listen(8081);

mongoose.connect('mongodb://localhost/chat');

var db = mongoose.connection;

var chatSchema = mongoose.Schema({
    user: String,
    text: String,
    time: String
});


function handler (request, response) {
        request.addListener('end', function () {
            fileServer.serve(request, response);
        }).resume();
    }


var Chat = mongoose.model('Chat', chatSchema);
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function(){
    
    console.log('Connected to MongoDb.');
    
    var io = require('socket.io').listen(app);
    io.set('log level', 1);

    io.sockets.on('connection', function (socket) {
        console.log('New Connection');
        
        socket.on('input', function (data){
            
            socket.broadcast.emit('input', data);
            
            var newChatText = new Chat({
                'user': data.user,
                'text': data.text,
                'time': data.time
            });
            newChatText.save(function(err, newChatText){
                if(err){
                    console.log("Error: " + err);
                } else {
                    console.log("Saved: " + newChatText);
                }
            });
        
        
            console.log("Emitting: " + data.text + " : " + data.time);        
        });
    
    });

});

    
    





