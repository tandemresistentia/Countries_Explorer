import { render, screen, fireEvent } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import App from '../src/App';
import { GET_COUNTRIES } from '../src/services/apollo';
import { mockCountries } from '../src/__mocks__/apollo';
import { describe, it, expect } from 'vitest';
const mocks = [{
  request: {
    query: GET_COUNTRIES
  },
  result: {
    data: {
      countries: mockCountries
    }
  }
}];

describe('App', async () => {
  it('renders country list and allows country selection', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <App />
      </MockedProvider>
    );

    expect(await screen.findByText('United States')).toBeInTheDocument();
    fireEvent.click(screen.getByText('United States'));
    expect(screen.getByText(/back to list/i)).toBeInTheDocument();
    
    fireEvent.click(screen.getByText(/back to list/i));
    expect(screen.getByText('United States')).toBeInTheDocument();
  });
});