// Write your tests here
import AppClass from './AppClass';
import React from 'react'
import * as rtl from '@testing-library/react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import AppFunctional from './AppFunctional';
// import userEvent from "@testing-library/user-event";

test("clicks around",async()=> {
  render(<AppFunctional/>)
  const right = screen.getByText(/right/i);
  const left = screen.getByText(/left/i)
  const up = screen.getByText(/up/i)
  const down = screen.getByText(/down/i)
  const coordinate = screen.getByText("Coordinate : (2,2)")
  fireEvent.click(right);
  await waitFor(()=> {
    expect(coordinate).toHaveTextContent("Coordinate : (3,2)");
  })
})
test("clicks and get an error message",async()=> {
  render(<AppFunctional/>)
  const right = screen.getByText(/right/i);
  const left = screen.getByText(/left/i)
  const up = screen.getByText(/up/i)
  const down = screen.getByText(/down/i)
  const coordinate = screen.getByText("Coordinate : (2,2)")
  fireEvent.click(right);
  fireEvent.click(down);
  fireEvent.click(left);
  fireEvent.click(left);
  const email = screen.getByPlaceholderText("type email");
  fireEvent.change(email, {target : {value : "jacoblang@gmail.com" }});
  const submit = screen.getByTestId("submit")
  fireEvent.click(submit);
  await waitFor(()=> {
    expect(coordinate).toHaveTextContent("Coordinate : (1,3)");    
  })
})
test("clicks and get an error message",async()=> {
  render(<AppFunctional/>)
  const right = screen.getByText(/right/i);
  const left = screen.getByText(/left/i)
  const up = screen.getByText(/up/i)
  const down = screen.getByText(/down/i)
  const coordinate = screen.getByText("Coordinate : (2,2)")
  fireEvent.click(right);
  fireEvent.click(down);
  fireEvent.click(left);
  fireEvent.click(left);
  const email = screen.getByPlaceholderText("type email");
  fireEvent.change(email, {target : {value : "jacoblang@gmail.com" }});
  const submit = screen.getByTestId("submit")
  fireEvent.click(submit);
  await waitFor(()=> {
    expect(email).not.toHaveTextContent("jacoblang@gmail.com");    
  })
})
test("clicks and get an error message",async()=> {
  render(<AppFunctional/>)
  const right = screen.getByText(/right/i);
  const left = screen.getByText(/left/i)
  const up = screen.getByText(/up/i)
  const down = screen.getByText(/down/i)
  const coordinate = screen.getByText("Coordinate : (2,2)")
  fireEvent.click(right);
  fireEvent.click(down);
  fireEvent.click(left);
  fireEvent.click(left);
  const email = screen.getByPlaceholderText("type email");
  const submit = screen.getByTestId("submit")
  fireEvent.click(submit);
  await waitFor(()=> {
    expect(screen.getByText("Ouch: email is required"));    
  })
})
test("clicks and get an error message",async()=> {
  render(<AppFunctional/>)
  const right = screen.getByText(/right/i);
  const left = screen.getByText(/left/i)
  const up = screen.getByText(/up/i)
  const down = screen.getByText(/down/i)
  const coordinate = screen.getByText("Coordinate : (2,2)")
  fireEvent.click(right);
  fireEvent.click(down);
  fireEvent.click(left);
  fireEvent.click(left);
  const email = screen.getByPlaceholderText("type email");
  fireEvent.change(email, {target : {value : "foo@email"}})
  const submit = screen.getByTestId("submit")
  fireEvent.click(submit);
  await waitFor(()=> {
    expect(screen.getByText("Ouch: email must be a valid email"));    
  })
})

