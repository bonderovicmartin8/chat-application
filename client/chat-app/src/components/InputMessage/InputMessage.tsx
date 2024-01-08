import {
  Box,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { ChangeEvent, useEffect, useState } from 'react';
import { BiSolidKeyboard } from 'react-icons/bi';
import { FaMicrophone } from 'react-icons/fa';
import { CgAttachment } from 'react-icons/cg';
import {
  ChatInfo,
  ClientToServerEvents,
  ServerToClientEvents,
} from '../../../../../types';
import { Socket } from 'socket.io-client';
import styles from './InputMessage.styles';

type InputMessageProps = {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>;
  username: string;
  room: string;
  setMessageList: React.Dispatch<React.SetStateAction<ChatInfo[]>>;
  messageList: ChatInfo[];
};

const InputMessage: React.FC<InputMessageProps> = ({
  socket,
  username,
  room,
  setMessageList,
}) => {
  const [inputMessage, setInputMessage] = useState<string>('');

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      if (inputMessage !== '') {
        const messageData = {
          room: room,
          author: username,
          message: inputMessage,
          time:
            new Date(Date.now()).getHours() +
            ':' +
            new Date(Date.now()).getMinutes(),
        };
        socket.emit('send_message', messageData);
        setMessageList((list) => [...list, messageData]);
      }
      setInputMessage('');
    }
  };

  useEffect(() => {
    socket.on('recieve_message', (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [setMessageList, socket]);

  return (
    <Flex w={'100%'}>
      <Formik
        initialValues={{ username: '' }}
        onSubmit={() => console.log('Submited')}
      >
        <Form style={{ width: '100%' }}>
          <Box p={6}>
            <Stack spacing={4}>
              <InputGroup>
                <InputLeftElement height={'100%'}>
                  <Icon as={BiSolidKeyboard} {...styles.iconStyle} />
                </InputLeftElement>
                <Input
                  type="text"
                  value={inputMessage}
                  placeholder="Write message"
                  onKeyDown={handleKeyDown}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setInputMessage(e.target.value)
                  }
                  {...styles.inputField}
                />
                <InputRightElement height={'100%'} mr={5}>
                  <Flex gap={2}>
                    <Icon as={CgAttachment} {...styles.iconStyle} />
                    <Icon as={FaMicrophone} {...styles.iconStyle} />
                  </Flex>
                </InputRightElement>
              </InputGroup>
            </Stack>
          </Box>
        </Form>
      </Formik>
    </Flex>
  );
};

export default InputMessage;
