import { ChatInfo } from '../../../../../types';
import ActiveUserCard from '../ActiveUserCard';

type RenderActiveUserCardsProps = {
  messageList: ChatInfo[];
  username: string;
};

const RenderActiveUserCards: React.FC<RenderActiveUserCardsProps> = ({
  messageList,
}) => {
  const uniqueUsernames = Array.from(
    new Set(messageList.map((message) => message.author))
  );
  const lastMessagesByUser: { [key: string]: ChatInfo } = {};
  messageList.forEach((message) => {
    const messageTime = new Date(message.time);
    const lastMessage = lastMessagesByUser[message.author];

    if (!lastMessage || messageTime > new Date(lastMessage.time)) {
      lastMessagesByUser[message.author] = message;
    }
  });
  return (
    <>
      {uniqueUsernames.map((name, id) => {
        return (
          <>
            <ActiveUserCard
              key={id}
              username={name}
              lastMessage={lastMessagesByUser[name]?.message || ''}
            />
          </>
        );
      })}
    </>
  );
};

export default RenderActiveUserCards;
