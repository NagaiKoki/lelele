import { todoAtom } from "@/store/todo";
import { Todo } from "@/types/todo";
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import { useLelele } from "lelele/src";
import { useState } from "react";
import { v4 as uuid } from "uuid";

export const AddTodoForm = () => {
  const [todo, setTodo] = useState<Pick<Todo, "title">>({ title: "" });
  const { addTodo } = useLelele(todoAtom);

  return (
    <Box>
      <Text fontWeight="bold">Add Todo</Text>
      <Flex marginTop="4px" gap="8px">
        <Input
          value={todo.title}
          onChange={(v) => setTodo({ title: v.target.value })}
        />
        <Button
          onClick={() => {
            addTodo({
              title: todo.title,
              id: uuid(),
              isDone: false,
            });
            setTodo({ title: "" });
          }}
          colorScheme="blue"
        >
          ADD
        </Button>
      </Flex>
    </Box>
  );
};
