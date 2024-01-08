export interface ServerToClientEvents {
  serverCredientals: (data: { room: string; username: string }) => void;
  join_room: (room: string) => void;
  send_message: (data: {
    room: string;
    author: string;
    message: string;
    time: string;
  }) => void;
  recieve_message: (data: {
    room: string;
    author: string;
    message: string;
    time: string;
  }) => void;
  user_count: (count: number) => void;
  room_name_updated: (data: { room: string; newRoomValue: string }) => void;
}

export interface ClientToServerEvents {
  clientCredientals: (data: { room: string; username: string }) => void;
  join_room: (room: string) => void;
  send_message: (data: {
    room: string;
    author: string;
    message: string;
    time: string;
  }) => void;
  recieve_message: (data: {
    room: string;
    author: string;
    message: string;
    time: string;
  }) => void;
  user_count: (count: number) => void;
  update_room_name: (data: { room: string; newRoomValue: string }) => void;
}

export type ChatInfo = {
  room: string;
  author: string;
  message: string;
  time: string;
};
