import { Box } from "@chakra-ui/react";
import { TodoList } from "@/components/TodoList";
import { AddTodoForm } from "@/components/AddTodoForm";
import { Header } from "@/components/Header";

export default function Lelele() {
  return (
    <Box>
      <Header />
      <Box width="800px" margin="110px auto">
        <TodoList />
        <Box marginTop="16px">
          <AddTodoForm />
        </Box>
      </Box>
    </Box>
  );
}
