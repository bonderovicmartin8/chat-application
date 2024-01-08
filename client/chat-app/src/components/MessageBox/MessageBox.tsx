import { Flex, Box } from '@chakra-ui/react';
import { ChatInfo } from '../../../../../types';
import styles from './MessageBox.styles';

type MessageBoxProps = {
  messageList: ChatInfo[];
  username: string;
};

const MessageBox: React.FC<MessageBoxProps> = ({ messageList, username }) => {
  return (
    <Flex direction="column">
      {messageList.map((message, id) => {
        return (
          <Flex
            key={id}
            justifyContent={
              username === message.author ? 'flex-end' : 'flex-start'
            }
            {...styles.messageWrapper}
          >
            <Box
              bgColor={username === message.author ? 'green.200' : 'gray.200'}
              {...styles.messageContainer}
            >
              <Box
                fontSize={'small'}
                color={username === message.author ? 'green.700' : 'black'}
              >
                {message.author}
              </Box>
              {message.message}
              <Box fontSize={'small'}>{message.time}</Box>
            </Box>
          </Flex>
        );
      })}
    </Flex>
  );
};

export default MessageBox;
