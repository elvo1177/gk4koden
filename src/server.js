const express = require("express");
const bodyParser = require('body-parser');
// const cors = require("cors");

const app = express();
const port = 3000

// app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const http = require('http').Server(app);
const io = require('socket.io')(http);
const host = 'localhost';
const path = require('path')

app.use(express.static(__dirname + '../client'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/home.html'));
  
});

app.get('/home.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/home.js'));
  
});

app.get('/global.css', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/global.css'));
  
});

// app.get('/styles.css', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/styles/global.css'));
  
// });

io.on('connection', (socket) => {
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });
  socket.on('user joined', username => {
    console.log(username + " joined the chat")
    io.emit('chat message', username + " joined the chat");
  });
});

http.listen(port, host, () => {
  console.log(`Socket.IO server running at http://${host}:${port}/`);
});

// server = app.listen(port, () => {
//   console.log(`Server open on port ${port}`);
// });
 
