import { io, Socket } from 'socket.io-client';
import {
  ChatInfo,
  ClientToServerEvents,
  ServerToClientEvents,
} from '../../../types';
import { useEffect, useState } from 'react';
import MessageBox from './components/MessageBox/MessageBox';
import InputMessage from './components/InputMessage/InputMessage';
import { Box, Flex, Heading } from '@chakra-ui/react';
import ChatNavbar from './components/ChatNavbar';
import styles from './App.styles';
import { Scrollbars } from 'react-custom-scrollbars-2';
import './styles/styles.css';
import CredientalsUI from './components/CredientalsUI/CredientalsUI';
import RenderActiveUserCards from './components/RenderActiveUserCards/RenderActiveUserCards';

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  'http://localhost:3000'
);

socket.on('connect', () => {
  console.log(`Client ${socket.id}`);
});

const App: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [room, setRoom] = useState<string>('');
  const [joinedAChat, setJoinedAChat] = useState<boolean>(true);
  const [messageList, setMessageList] = useState<ChatInfo[]>([]);
  const [activeUsersInRoom, setActiveUsersInRoom] = useState<number>(0);

  useEffect(() => {
    const handleUserCount = (count: number) => {
      setActiveUsersInRoom(count);
    };

    socket.on('user_count', handleUserCount);
    return () => {
      socket.off('serverCredientals');
      socket.off('user_count', handleUserCount);
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <Flex w={'100%'} h={'100%'}>
        <Flex {...styles.messageWrapper} flexDirection={'column'}>
          {!joinedAChat && (
            <ChatNavbar room={room} setRoom={setRoom} socket={socket} />
          )}
          <Scrollbars style={{ width: '100%' }}>
            <Flex {...styles.messageContainer} direction={'column'}>
              <MessageBox messageList={messageList} username={username} />
              {joinedAChat && (
                <CredientalsUI
                  socket={socket}
                  username={username}
                  setUsername={setUsername}
                  room={room}
                  setRoom={setRoom}
                  setJoinedAChat={setJoinedAChat}
                />
              )}
            </Flex>
          </Scrollbars>
          <Flex w={'100%'}>
            {!joinedAChat && (
              <InputMessage
                socket={socket}
                username={username}
                room={room}
                setMessageList={setMessageList}
                messageList={messageList}
              />
            )}
          </Flex>
        </Flex>
        {!joinedAChat && (
          <Flex direction={'column'} {...styles.activeUsersContainer}>
            <Heading {...styles.headingForActiveUsers}>
              <Flex gap={2} className="heading">
                Currently active users:
                <Box color={'green.400'}>{activeUsersInRoom}</Box>
              </Flex>
            </Heading>
            <Flex h={'100%'} w={'100%'} flexDir={'column'}>
              <Scrollbars style={{ width: '100%', height: '100%' }}>
                <RenderActiveUserCards
                  username={username}
                  messageList={messageList}
                />
              </Scrollbars>
            </Flex>
          </Flex>
        )}
      </Flex>
    </>
  );
};

export default App;
