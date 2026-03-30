import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import GoalInput from './GoalInput';

test('adds a new goal when Add button is clicked', () => {
  const mockOnAdd = jest.fn();
  render(<GoalInput onAdd={mockOnAdd} />);

  const input = screen.getByPlaceholderText('Add new goal');
  const addButton = screen.getByText('Add');

  fireEvent.change(input, { target: { value: 'Test Goal' } });
  fireEvent.click(addButton);

  expect(mockOnAdd).toHaveBeenCalledWith('Test Goal', '');
  expect(input.value).toBe('');
});

test('adds a new goal with deadline when Add button is clicked', () => {
  const mockOnAdd = jest.fn();
  render(<GoalInput onAdd={mockOnAdd} />);

  const textInput = screen.getByPlaceholderText('Add new goal');
  const dateInput = screen.getAllByDisplayValue('').find(el => el.type === 'date');
  const addButton = screen.getByText('Add');

  fireEvent.change(textInput, { target: { value: 'Test Goal with Deadline' } });
  fireEvent.change(dateInput, { target: { value: '2026-03-25' } });
  fireEvent.click(addButton);

  expect(mockOnAdd).toHaveBeenCalledWith('Test Goal with Deadline', '2026-03-25');
  expect(textInput.value).toBe('');
  expect(dateInput.value).toBe('');
});

test('does not add empty goal', () => {
  const mockOnAdd = jest.fn();
  render(<GoalInput onAdd={mockOnAdd} />);

  const addButton = screen.getByText('Add');
  fireEvent.click(addButton);

  expect(mockOnAdd).not.toHaveBeenCalled();
});

test('adds goal on Enter key press', () => {
  const mockOnAdd = jest.fn();
  render(<GoalInput onAdd={mockOnAdd} />);

  const input = screen.getByPlaceholderText('Add new goal');
  fireEvent.change(input, { target: { value: 'Enter Goal' } });
  fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

  expect(mockOnAdd).toHaveBeenCalledWith('Enter Goal', '');
});