import { profileAtom } from "@/store/profile";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Box,
  Input,
  Flex,
  Button,
} from "@chakra-ui/react";
import { useLelele } from "lelele/src";
import { useCallback, useState } from "react";

type Props = {
  onClose: () => void;
};

export const ProfileForm = ({ onClose }: Props) => {
  const {
    name: currentName,
    age: currentAge,
    onChangeName,
    onChangeAge,
  } = useLelele(profileAtom);
  const [name, setName] = useState(currentName);
  const [age, setAge] = useState<number | string>(currentAge);

  const handleOnSave = useCallback(() => {
    onChangeName(name);

    if (typeof age === "number") {
      onChangeAge(age);
    }
    onClose();
  }, [onChangeName, onChangeAge, onClose, name, age]);

  return (
    <Box>
      <Flex flexDirection="column" gap="16px">
        <FormControl>
          <FormLabel>User Name</FormLabel>
          <Input
            value={name}
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>User Age</FormLabel>
          <Input
            value={age}
            type="number"
            onChange={(e) =>
              setAge(e.target.value ? Number(e.target.value) : "")
            }
          />
        </FormControl>
        <Button colorScheme="blue" onClick={handleOnSave}>
          Save
        </Button>
      </Flex>
    </Box>
  );
};
