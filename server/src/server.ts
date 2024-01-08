import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import { ClientToServerEvents, ServerToClientEvents } from './../../types.d';

const app = express();

const server = createServer(app);

const io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
  cors: {
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST'],
  },
});

let connectedUsers = 0;

io.on(
  'connection',
  (socket: Socket<ClientToServerEvents, ServerToClientEvents>) => {
    connectedUsers++;
    socket.emit('user_count', connectedUsers);

    socket.on('join_room', (data) => {
      socket.join(data);
      console.log(`User with USEDID:${socket.id} joined room ${data}`);
    });

    socket.on('send_message', (data) => {
      socket.to(data.room).emit('recieve_message', data);
      console.log(data);
    });

    socket.on('update_room_name', (data) => {
      socket.to(data.room).emit('room_name_updated', {
        room: data.room,
        newRoomValue: data.newRoomValue,
      });
      socket.emit('room_name_updated', {
        room: data.room,
        newRoomValue: data.newRoomValue,
      });
    });

    socket.on('disconnect', () => {
      connectedUsers--;
      socket.emit('user_count', connectedUsers);
      console.log('User Disconnected', socket.id);
    });
  }
);

server.listen(3000);
