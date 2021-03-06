const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

var serverOptions = {
	key: fs.readFileSync('server.key'),
	cert: fs.readFileSync('server.crt'),
	passphrase: 'supertest'	
}

const server = require ('https').createServer(serverOptions, app);
const io = require('socket.io')(server);

module.exports = app;

//for the peer server
var options = {
	debug: true,
}

app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'browser')));
app.use(express.static(path.join(__dirname, 'jsmpeg')));


//serves up the HTML
app.get('/', function(req, res, next){
	res.sendFile(path.join(__dirname, 'index.html'));
});


// websocket stuff here. displays dis/connect
io.on('connection', function(peer){
	console.log(peer.id, 'connected');
});

io.on('disconnect', function(peer){
	console.log(peer.id, 'disconnected');
})

server.listen(3030, function(){
	console.log('listening on *:3030');
});