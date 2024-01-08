import { Socket } from 'socket.io-client';
import { ClientToServerEvents, ServerToClientEvents } from '../../../../types';

type joinRoomFunctionProps = {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>;
  username: string;
  room: string;
};

export const joinRoom = ({ socket, username, room }: joinRoomFunctionProps) => {
  if (username !== '' && room !== '') {
    socket.emit('join_room', room);
  }
};
