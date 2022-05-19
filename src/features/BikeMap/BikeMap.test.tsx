import React from 'react';
import { render, screen } from '@testing-library/react';
import BikeMap from './BikeMap';

test('renders learn react link', () => {
  render(<BikeMap />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
