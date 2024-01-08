import { Box, Flex, Image, Text } from '@chakra-ui/react';
import userIcon from '../../../public/user-icon.png';
import styles from './ActiveUserCard.styles';

type ActiveUserCardProps = {
  username: string;
  lastMessage: string;
};

const ActiveUserCard: React.FC<ActiveUserCardProps> = ({
  username,
  lastMessage,
}) => {
  return (
    <Flex flexDirection={'column'} alignItems={'center'}>
      <Flex {...styles.userWrapper}>
        <Flex {...styles.imageContainer}>
          <Image src={userIcon} h="40px" w="40px" />
        </Flex>
        <Flex {...styles.descriptionContainer} flexDirection={'column'}>
          <Flex alignItems={'center'}>
            <Text {...styles.username} className='heading'>{username}</Text>
            <Box {...styles.activeBubble}></Box>
          </Flex>
          <Text color={'gray.600'}>{lastMessage}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ActiveUserCard;
