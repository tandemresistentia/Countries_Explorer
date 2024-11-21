// src/__tests__/CountryList.test.tsx
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { CountryList } from '../components/CountryList';
import { GET_COUNTRIES } from '../services/apollo';
import { mockCountries } from '../__mocks__/apollo';
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

describe('CountryList', () => {
  const mockOnSelectCountry = vi.fn();

  it('renders loading state', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CountryList
          searchQuery=""
          filters={{}}
          onSelectCountry={mockOnSelectCountry}
        />
      </MockedProvider>
    );
  });

  it('renders countries after loading', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CountryList
          searchQuery=""
          filters={{}}
          onSelectCountry={mockOnSelectCountry}
        />
      </MockedProvider>
    );

    // Wait for countries to load
    expect(await screen.findByText('United States')).toBeInTheDocument();
    expect(screen.getByText('France')).toBeInTheDocument();
  });

  it('filters countries by search query', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CountryList
          searchQuery="France"
          filters={{}}
          onSelectCountry={mockOnSelectCountry}
        />
      </MockedProvider>
    );

    expect(await screen.findByText('France')).toBeInTheDocument();
    expect(screen.queryByText('United States')).not.toBeInTheDocument();
  });

  it('filters countries by region', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CountryList
          searchQuery=""
          filters={{ region: 'Europe' }}
          onSelectCountry={mockOnSelectCountry}
        />
      </MockedProvider>
    );

    expect(await screen.findByText('France')).toBeInTheDocument();
    expect(screen.queryByText('United States')).not.toBeInTheDocument();
  });
});

