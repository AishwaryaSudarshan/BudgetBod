// Dashboard.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios'; // Mock axios for testing
import Dashboard from './Dashboard';

jest.mock('axios');

describe('Dashboard component', () => {
  beforeEach(() => {
    // Mock axios.post and axios.get
    axios.post.mockResolvedValue({ data: {} });
    axios.get.mockResolvedValue({ data: [] });
  });

  test('renders the component', () => {
    render(<Dashboard />);
    // Check if the component renders without crashing
    expect(screen.getByText('Daily Streak')).toBeInTheDocument();
  });

  test('saves data when Save button is clicked', async () => {
    render(<Dashboard />);
    
    // Mock user input
    fireEvent.change(screen.getByPlaceholderText('Enter Calorie Intake'), { target: { value: '100' } });
    fireEvent.change(screen.getByPlaceholderText('Enter Activity'), { target: { value: 'Running' } });

    // Mock axios.post response
    axios.post.mockResolvedValueOnce({});

    // Simulate button click
    fireEvent.click(screen.getByText('Save'));

    // Wait for axios.post to be called
    await screen.findByText('Saved successfully');

    // Check if axios.post was called with the correct data
    expect(axios.post).toHaveBeenCalledWith('http://localhost:3000/dashboard', {
      date: expect.any(String),
      calText: '100',
      actText: 'Running',
    });
  });
});
