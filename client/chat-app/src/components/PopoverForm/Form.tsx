import { Button, ButtonGroup, FormControlProps, Stack } from '@chakra-ui/react';
import { RefObject } from 'react';
import TextInput from './TextInput';

type FormProps = {
  firstFieldRef: RefObject<HTMLInputElement>;
  onCancel: () => void;
  room: string;
  newRoomValue: string;
  setNewRoomValue: React.Dispatch<React.SetStateAction<string>>;
  onSave: () => void;
} & FormControlProps;

const Form: React.FC<FormProps> = ({
  firstFieldRef,
  onCancel,
  room,
  newRoomValue,
  setNewRoomValue,
  onSave,
}) => {
  return (
    <Stack spacing={4}>
      <TextInput
        label="Room name"
        id="room-name"
        inputRef={firstFieldRef}
        newRoomValue={newRoomValue}
        setNewRoomValue={setNewRoomValue}
      />
      <ButtonGroup display="flex" justifyContent="flex-end">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          isDisabled={room === '' ? true : false}
          onClick={onSave}
          colorScheme="green"
        >
          Save
        </Button>
      </ButtonGroup>
    </Stack>
  );
};

export default Form;
