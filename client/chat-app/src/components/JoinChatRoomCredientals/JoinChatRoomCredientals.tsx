import { Button, Flex, Input } from '@chakra-ui/react';
import { joinRoom } from '../../utils/joinRoom';
import { Socket } from 'socket.io-client';
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from '../../../../../types';
import styles from './JoinChatRoomCredientals.styles';

type JoinChatRoomCredientalsProps = {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  room: string;
  setRoom: React.Dispatch<React.SetStateAction<string>>;
  setJoinedAChat: React.Dispatch<React.SetStateAction<boolean>>;
};

const JoinChatRoomCredientals: React.FC<JoinChatRoomCredientalsProps> = ({
  socket,
  username,
  setUsername,
  room,
  setRoom,
  setJoinedAChat,
}) => {
  return (
    <Flex direction={'column'} {...styles.mainContainer}>
      <Flex flexDirection={'column'} w={'40%'}>
        <Input
          type={'text'}
          value={username}
          placeholder={'Enter your username'}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setUsername(event.target.value);
          }}
          {...styles.inputUsername}
        />
        <Input
          type={'text'}
          value={room}
          placeholder={'Enter the room you want to join'}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setRoom(event.target.value);
          }}
          {...styles.inputRoom}
        />
        <Button
          onClick={() => {
            if (username !== '' && room !== '') {
              joinRoom({ socket, username, room });
              setJoinedAChat(false);
            }
          }}
          {...styles.buttonStyle}
        >
          Join a chat
        </Button>
      </Flex>
    </Flex>
  );
};

export default JoinChatRoomCredientals;
