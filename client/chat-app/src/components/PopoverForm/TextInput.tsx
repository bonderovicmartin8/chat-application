import {
  FormControl,
  FormControlProps,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { InputHTMLAttributes, Ref, forwardRef } from 'react';

type TextInputProps = {
  label: string;
  id: string;
  inputRef?: Ref<HTMLInputElement>;
  newRoomValue: string;
  setNewRoomValue: React.Dispatch<React.SetStateAction<string>>;
} & InputHTMLAttributes<HTMLInputElement> &
  FormControlProps;

const TextInput: React.FC<TextInputProps> = forwardRef<
  HTMLInputElement,
  TextInputProps
>(({ label, id, newRoomValue, setNewRoomValue, ...rest }, firstFieldRef) => {
  return (
    <FormControl>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <Input
        id={id}
        ref={firstFieldRef}
        value={newRoomValue}
        onChange={(event) => setNewRoomValue(event.target.value)}
        {...rest}
      />
    </FormControl>
  );
});

export default TextInput;
