import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);

const _dirName = dirname(fileURLToPath(import.meta.url));

app.get('/', (req,res) => {
    res.sendFile(join(_dirName, 'index.html'));
});

io.on('connection', (socket) => {
    console.log("A user has connected");
    
    socket.on('chat message', (msg) => {
        console.log("Message: " + msg);
    })
    
    socket.on('disconnect', () => {
        console.log('A user has disconnected');
    });
})

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});