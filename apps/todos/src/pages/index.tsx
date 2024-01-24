import { TodoItem } from "@/components/TodoItem";
import { Todo } from "@/types/todo";
import { Box, Button, Heading, List } from "@chakra-ui/react";
import { atom } from "lelele/src/atom";
import { v4 as uuid } from "uuid";

const todoItems: Todo[] = [
  {
    id: uuid(),
    title: "Create a report for Project A",
    isDone: false,
  },
  {
    id: uuid(),
    title: "Prepare for the meeting with Client B",
    isDone: false,
  },
  {
    id: uuid(),
    title: "Prepare presentation slides for the conference call",
    isDone: false,
  },
  {
    id: uuid(),
    title: "Do laundry and fold clothes",
    isDone: false,
  },
  {
    id: uuid(),
    title: "Organize the items in the refrigerator",
    isDone: false,
  },
  {
    id: uuid(),
    title: "Prepare for the school event for the kids",
    isDone: false,
  },
  {
    id: uuid(),
    title: "Learn new vocabulary in a foreign language",
    isDone: false,
  },
  {
    id: uuid(),
    title: "Solve math homework",
    isDone: false,
  },
  {
    id: uuid(),
    title: "Read one chapter of a specialized book",
    isDone: false,
  },
  {
    id: uuid(),
    title: "Jog for 30 minutes",
    isDone: false,
  },
  {
    id: uuid(),
    title: "Plan meals focusing on vegetables",
    isDone: false,
  },
  {
    id: uuid(),
    title: "Stretch every night",
    isDone: false,
  },
  {
    id: uuid(),
    title: "Try a new recipe and cook a meal",
    isDone: false,
  },
];

export default function Lelele() {
  return (
    <Box width="800px" margin="30px auto">
      <Heading>Todo App</Heading>
      <Box marginTop="16px">
        <Box display="flex" justifyContent="end">
          <Button colorScheme="yellow">Done</Button>
        </Box>
        <List display="flex" flexDirection="column" gap="8px" marginTop="12px">
          {todoItems.map((item) => (
            <TodoItem key={item.id} title={item.title} onClick={() => {}} />
          ))}
        </List>
      </Box>
    </Box>
  );
}
