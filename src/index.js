import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);

// Get the current directory
const __dirname = dirname(fileURLToPath(import.meta.url));

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

// Handle Socket.IO connections
io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for chat messages
    socket.on('chat message', (msg) => {
        // Broadcast the message to all clients
        io.emit('chat message', msg);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
});

// Start the server
server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
