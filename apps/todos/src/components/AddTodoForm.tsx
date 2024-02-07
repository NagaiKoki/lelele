import { todoAtom } from "@/store/todo";
import { Todo } from "@/types/todo";
import { Box, Button, Flex, Input } from "@chakra-ui/react";
import { useLelele } from "lelele";
import { useState } from "react";
import { v4 as uuid } from "uuid";

export const AddTodoForm = () => {
  const [todo, setTodo] = useState<Pick<Todo, "title">>({ title: "" });
  const { addTodo } = useLelele(todoAtom);

  return (
    <Box>
      <Input
        height="45px"
        placeholder="homework..."
        value={todo.title}
        onChange={(v) => setTodo({ title: v.target.value })}
      />
      <Flex justifyContent="flex-end">
        <Button
          marginTop="8px"
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
