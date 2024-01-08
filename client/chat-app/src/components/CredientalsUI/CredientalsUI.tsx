import { Flex, Heading, Image, Text } from '@chakra-ui/react';
import JoinChatRoomCredientals from '../JoinChatRoomCredientals';
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from '../../../../../types';
import { Socket } from 'socket.io-client';
import './CredientalsUI.css';
import styles from './Credientals.styles';
import { useEffect, useState } from 'react';

type CredientalsUIProps = {
  socket: Socket<ClientToServerEvents, ServerToClientEvents>;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  room: string;
  setRoom: React.Dispatch<React.SetStateAction<string>>;
  setJoinedAChat: React.Dispatch<React.SetStateAction<boolean>>;
};

const CredientalsUI: React.FC<CredientalsUIProps> = ({
  socket,
  username,
  setUsername,
  room,
  setRoom,
  setJoinedAChat,
}) => {
  const [userCount, setUserCount] = useState<number>(0);

  useEffect(() => {
    const handleUserCount = (count: number) => {
      setUserCount(count);
    };

    socket.on('user_count', handleUserCount);

    return () => {
      socket.off('user_count', handleUserCount); 
    };
  }, [socket]);

  return (
    <Flex {...styles.enterCredientalsContainer}>
      <Flex flex={1}>
        <Image
          src={'../../../public/image.svg'}
          width={'40vw'}
          height={'45vh'}
        />
      </Flex>
      <Flex direction={'column'} {...styles.credientalsContainer}>
        <Flex {...styles.textWrapper} direction={'column'}>
          <Heading className="heading" fontSize={'4xl'}>
            <Flex>
              <Text color="green.400" mr={2}>
                Join
              </Text>
              a room and
            </Flex>
          </Heading>
          <Heading className="heading">
            <Flex>
              <Text color="green.400" mr={2}>
                chat
              </Text>
              with your friends!
            </Flex>
          </Heading>
          <Text fontWeight={'semibold'} mt={2}>
            {userCount} currently active users
          </Text>
          <JoinChatRoomCredientals
            socket={socket}
            username={username}
            setUsername={setUsername}
            room={room}
            setRoom={setRoom}
            setJoinedAChat={setJoinedAChat}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CredientalsUI;
