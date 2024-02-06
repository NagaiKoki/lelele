import { Checkbox, Text } from "@chakra-ui/react";

type Props = {
  title: string;
  onClick: (bool: boolean) => void;
};

export const TodoItem = ({ title, onClick }: Props) => {
  return (
    <Checkbox
      padding="12px 16px"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="8px"
      onChange={(e) => onClick(e.target.checked)}
    >
      <Text>{title}</Text>
    </Checkbox>
  );
};
