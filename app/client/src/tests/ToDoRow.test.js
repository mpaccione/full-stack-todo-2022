import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Table, TableBody } from "@mui/material";

import { ToDoRow } from "../components/todo/index";

let todos = [
  {
      "id": "30834b7c-bbba-49e8-8356-af4b4736bd97",
      "completed": true,
      "description": "Review Coding Challenge"
  },
  {
      "id": "8e9fcc61-9e8f-451d-b7ee-f8445268b3ff",
      "completed": false,
      "description": "Hire Michael Paccione"
  },
  {
      "id": "8ca3449a-3f81-4d2e-8b27-89e9f2b2a7cc",
      "completed": false,
      "description": "Live Long and Prosper"
  }
]

// quick function mocks
const getProps = () => { 
  return {
    removeTodo: (condition) => { 
      todos = todos.filter((todo) => condition(todo))
    },
    updateTodoList: ({ completed, description, id }) => {
      const index = todos.findIndex(todo => id === todo.id)
      todos[index] = { completed, description, id }
    },
    ...todos[1]
  }
}

test("test completed states", () => {
  const { container, rerender } = render(
    <Table>
      <TableBody>
        <ToDoRow {...getProps()} />
      </TableBody>
    </Table>
  );

  // start uncompleted
  expect(container.className).toEqual('')
  expect(todos[1].completed).toEqual(false)
  expect(container.querySelectorAll('img').length).toEqual(1)
  
  // completed state upon click
  userEvent.click(container.querySelector('td').children[0]);

  rerender(
    <Table>
      <TableBody>
        <ToDoRow {...getProps()} />
      </TableBody>
    </Table>
  );

  const completedImg = container.querySelectorAll('img')[0]

  expect(todos[1].completed).toEqual(true)
  expect(completedImg.getAttribute('src')).toContain('icon-check.svg')
});

test("test remove img and execution", () => {
  const { container } = render(
    <Table>
      <TableBody>
        <ToDoRow {...getProps()} />
      </TableBody>
    </Table>
  );
  const removeImg = container.querySelectorAll('img')[1]
  
  // remove upon click
  userEvent.click(removeImg);

  expect(removeImg.getAttribute('src')).toContain('icon-cross.svg')
  expect(todos.findIndex(todo => todo.id ==="8e9fcc61-9e8f-451d-b7ee-f8445268b3ff")).toEqual(-1)
});