import { Flex, Heading, Icon, Spacer } from '@chakra-ui/react';
import { HiUserGroup } from 'react-icons/hi2';
import styles from './ChatNavbar.styles';
import PopoverForm from '../PopoverForm/PopoverForm';
import { Socket } from 'socket.io-client';
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from '../../../../../types';

type ChatNavbarProps = {
  room: string;
  setRoom: React.Dispatch<React.SetStateAction<string>>;
  socket: Socket<ServerToClientEvents, ClientToServerEvents>;
};

const ChatNavbar: React.FC<ChatNavbarProps> = ({ socket, room, setRoom }) => {
  return (
    <Flex {...styles.navbarContainer}>
      <Icon boxSize={10} as={HiUserGroup} color={'green.400'} />
      <Heading {...styles.navbarHeader} className="heading">
        You are now in room {room}
      </Heading>
      <Spacer />
      <PopoverForm room={room} setRoom={setRoom} socket={socket} />
    </Flex>
  );
};

export default ChatNavbar;
