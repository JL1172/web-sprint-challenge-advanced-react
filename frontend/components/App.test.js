// Write your tests here
import React from 'react';
import * as rtl from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { fireEvent,render,screen } from "@testing-library/react";
import AppClass from './AppClass';
import AppFunctional from './AppFunctional';

test("It verifies the heading",()=> {
  render(<AppFunctional/>)
  expect(screen.getByText(/Welcome to the GRID/i));
})
test("clicks around",()=> {
  render(<AppFunctional/>)
  const right = screen.get
})
