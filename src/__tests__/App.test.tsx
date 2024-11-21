import { render, screen, fireEvent } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import App from '../App';
import { GET_COUNTRIES } from '../services/apollo';
import { mockCountries } from '../__mocks__/apollo';

const mocks = [
  {
    request: {
      query: GET_COUNTRIES
    },
    result: {
      data: {
        countries: mockCountries
      }
    }
  }
];

describe('App', () => {
  it('renders country list and allows country selection', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <App />
      </MockedProvider>
    );

    // Wait for countries to load
    expect(await screen.findByText('United States')).toBeInTheDocument();

    // Click on a country
    fireEvent.click(screen.getByText('United States'));
    
    // Check if country detail is shown
    expect(screen.getByText(/back to list/i)).toBeInTheDocument();

    // Go back to list
    fireEvent.click(screen.getByText(/back to list/i));
    
    // Check if we're back to the list
    expect(screen.getByText('United States')).toBeInTheDocument();
  });
});