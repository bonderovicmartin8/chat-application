import {
  IconButton,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
  Box,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { LuSettings2 } from 'react-icons/lu';
import Form from './Form';
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from '../../../../../types';
import { Socket } from 'socket.io-client';

type PopoverFormProps = {
  room: string;
  setRoom: React.Dispatch<React.SetStateAction<string>>;
  socket: Socket<ServerToClientEvents, ClientToServerEvents>;
};

const PopoverForm: React.FC<PopoverFormProps> = ({ room, setRoom, socket }) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const firstFieldRef = useRef(null);
  const [newRoomValue, setNewRoomValue] = useState<string>('');

  const handleSave = () => {
    socket.emit('update_room_name', { room, newRoomValue: newRoomValue });
    setRoom(newRoomValue);
    onClose();
  };

  return (
    <Box m={4}>
      <Popover
        isOpen={isOpen}
        initialFocusRef={firstFieldRef}
        onOpen={onOpen}
        onClose={onClose}
        placement="right"
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <IconButton size="sm" icon={<LuSettings2 />} aria-label={''} />
        </PopoverTrigger>
        <PopoverContent p={5}>
          <PopoverArrow />
          <PopoverCloseButton />
          <Form
            firstFieldRef={firstFieldRef}
            onCancel={onClose}
            room={room}
            newRoomValue={newRoomValue}
            setNewRoomValue={setNewRoomValue}
            onSave={handleSave}
          />
        </PopoverContent>
      </Popover>
    </Box>
  );
};

export default PopoverForm;
