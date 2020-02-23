import React from 'react';
import { render } from '@testing-library/react';
import ApplicationWarehouse from './ApplicationWarehouse';

test('renders learn react link', () => {
  const { getByText } = render(<ApplicationWarehouse />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
