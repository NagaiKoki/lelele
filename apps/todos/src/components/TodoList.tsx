import { TodoItem } from "@/components/TodoItem";
import { todoAtom } from "@/store/todo";
import { Box, Button, List, Text } from "@chakra-ui/react";
import { useLelele } from "lelele";

export const TodoList = () => {
  const { targetDone, todoItems, addTargetDone, deleteDoneTodo } =
    useLelele(todoAtom);

  return (
    <Box marginTop="16px">
      <Box display="flex" justifyContent="end">
        <Button colorScheme="yellow" onClick={deleteDoneTodo}>
          <Text>DONE</Text>
          {targetDone.length > 0 && (
            <Text
              marginLeft="8px"
              color="white"
              padding="4px"
              width="25px"
              height="25px"
              borderRadius="full"
              background="gray.800"
            >
              {targetDone.length}
            </Text>
          )}
        </Button>
      </Box>
      <List display="flex" flexDirection="column" gap="8px" marginTop="12px">
        {todoItems.map((item) => (
          <TodoItem
            key={item.id}
            title={item.title}
            onClick={() => addTargetDone(item)}
          />
        ))}
      </List>
    </Box>
  );
};
