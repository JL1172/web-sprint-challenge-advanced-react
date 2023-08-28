// Write your tests here
import AppClass from './AppClass';
import React from 'react'
import AppFunctional from './frontend/components/AppFunctional'
import AppClass from './frontend/components/AppClass'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import AppFunctional from './AppFunctional';

test("It verifies the heading",()=> {
  render(<AppFunctional/>)
  expect(screen.getByText(/Welcome to the GRID/i));
})
test("clicks around",()=> {
  render(<AppFunctional/>)
  const right = screen.getByText(/right/i);
  console.log(right)
})
