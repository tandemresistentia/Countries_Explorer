import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CountryDetail from '../src/components/CountryDetail';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Country } from '../src/types/commonTypes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';

describe('CountryDetail', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const country: Country = {
    code: 'US',
    name: 'United States',
    capital: 'Washington, D.C.',
    region: 'North America',
    languages: [{ name: 'English' }],
    currency: 'USD',
    phone: '+1',
    emoji: '🇺🇸',
    flag: '🇺🇸',
    area: 9833517,
    population: 331002651,
    timezones: ['UTC-12:00', 'UTC-11:00'],
    continent: { name: 'North America' }
  };
  
  const mockOnBack = vi.fn();

  const renderWithProviders = (ui: React.ReactElement) => {
    return render(
      <ChakraProvider value={defaultSystem}>
        <QueryClientProvider client={queryClient}>
          {ui}
        </QueryClientProvider>
      </ChakraProvider>
    );
  };

  beforeEach(() => {
    queryClient.clear();
  });

  it('renders country details correctly', () => {
    renderWithProviders(<CountryDetail country={country} onBack={mockOnBack} />);

    expect(screen.getByRole('heading', { level: 1, name: country.name })).toBeInTheDocument();
    expect(screen.getByText(country.capital)).toBeInTheDocument();
    expect(screen.getByText(country.emoji)).toBeInTheDocument();
    expect(screen.getByText(country.continent.name)).toBeInTheDocument();
    expect(screen.getByText(country.languages[0].name)).toBeInTheDocument();
    expect(screen.getByText(country.currency)).toBeInTheDocument();
    expect(screen.getByText('++1')).toBeInTheDocument();
  });

  it('calls onBack when back button is clicked', async () => {
    renderWithProviders(<CountryDetail country={country} onBack={mockOnBack} />);
    
    const backButton = screen.getByRole('button', { name: /back to list/i });
    await userEvent.click(backButton);
    
    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });
});