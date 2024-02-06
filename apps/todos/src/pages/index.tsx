import { Box, Heading } from "@chakra-ui/react";
import { TodoList } from "@/components/TodoList";
import { AddTodoForm } from "@/components/AddTodoForm";

export default function Lelele() {
  return (
    <Box width="800px" margin="30px auto">
      <Heading>Todo App</Heading>
      <TodoList />
      <Box
        background="white"
        position="fixed"
        bottom="128px"
        borderTop="1px solid"
        borderColor="gray.300"
        paddingTop="24px"
        width="800px"
      >
        <AddTodoForm />
      </Box>
    </Box>
  );
}
