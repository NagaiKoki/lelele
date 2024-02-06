import { useRef } from "react";
import { TodoItem } from "@/components/TodoItem";
import { Todo } from "@/types/todo";
import {
  Box,
  Button,
  Heading,
  List,
  Text,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { atom, useLelele } from "lelele/src";
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

const todoAtom = atom({
  key: "todo",
  initialState: {
    todoItems,
    targetDone: [],
  } as { todoItems: Todo[]; targetDone: Todo[] },
  stateUpdate: {
    addTargetDone: (currentState, todo: Todo) => {
      const hasTodo = currentState.targetDone.find((t) => t.id === todo.id);

      if (hasTodo) {
        return {
          ...currentState,
          targetDone: currentState.targetDone.filter((t) => t.id !== todo.id),
        };
      } else {
        return {
          ...currentState,
          targetDone: [...currentState.targetDone, todo],
        };
      }
    },
    deleteDoneTodo: (state) => {
      const todos = state.todoItems.filter(
        (item) => !state.targetDone.map((d) => d.id).includes(item.id),
      );
      return {
        ...state,
        todoItems: todos,
        targetDone: [],
      };
    },
  },
});

export default function Lelele() {
  const { state, addTargetDone, deleteDoneTodo } = useLelele(todoAtom);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <Box width="800px" margin="30px auto">
      <Heading>Todo App</Heading>
      <Box marginTop="16px">
        <Box display="flex" justifyContent="end">
          <Button colorScheme="yellow" onClick={onOpen}>
            <Text>DONE</Text>
            {state.targetDone.length > 0 && (
              <Text
                marginLeft="8px"
                color="white"
                padding="4px"
                width="25px"
                height="25px"
                borderRadius="full"
                background="gray.800"
              >
                {state.targetDone.length}
              </Text>
            )}
          </Button>
        </Box>
        <List display="flex" flexDirection="column" gap="8px" marginTop="12px">
          {state.todoItems.map((item) => (
            <TodoItem
              key={item.id}
              title={item.title}
              onClick={() => addTargetDone(item)}
            />
          ))}
        </List>
      </Box>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Customer
            </AlertDialogHeader>

            <AlertDialogBody>All you done?</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  deleteDoneTodo();
                  onClose();
                }}
                ml={3}
              >
                DONE
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}
