import { atom } from "lelele";
import { Todo } from "@/types/todo";
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

export const todoAtom = atom({
  key: "todo",
  initialState: {
    todoItems,
    targetDone: [],
  } as { todoItems: Todo[]; targetDone: Todo[] },
  stateUpdate: {
    addTodo: (currentState, todo: Todo) => {
      return {
        ...currentState,
        todoItems: [...currentState.todoItems, todo],
      };
    },
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
