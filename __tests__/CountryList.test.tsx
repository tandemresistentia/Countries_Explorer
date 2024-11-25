import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { CountryList } from '../src/components/CountryList';
import { GET_COUNTRIES } from '../src/services/apollo';
import { mockCountries } from './__mocks__/apollo';
import { describe, it, expect, vi } from 'vitest';

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

const defaultProps = {
  searchQuery: "",
  filters: {},
  onSelectCountry: vi.fn(),
  page: 1,
  itemsPerPage: 20
};

describe('CountryList', () => {
  it('renders loading state', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CountryList {...defaultProps} />
      </MockedProvider>
    );

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders countries after loading', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CountryList {...defaultProps} />
      </MockedProvider>
    );

    expect(await screen.findByText('United States')).toBeInTheDocument();
    expect(screen.getByText('France')).toBeInTheDocument();
  });

  it('filters countries by search query', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CountryList {...defaultProps} searchQuery="France" />
      </MockedProvider>
    );

    expect(await screen.findByText('France')).toBeInTheDocument();
    expect(screen.queryByText('United States')).not.toBeInTheDocument();
  });

  it('filters countries by region', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CountryList 
          {...defaultProps} 
          filters={{ region: 'Europe' }}
        />
      </MockedProvider>
    );

    expect(await screen.findByText('France')).toBeInTheDocument();
    expect(screen.queryByText('United States')).not.toBeInTheDocument();
  });
});