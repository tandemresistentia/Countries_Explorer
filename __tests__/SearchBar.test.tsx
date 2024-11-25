import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../src/components/SearchBar';
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('SearchBar', () => {
  const mockOnSearch = vi.fn();
  const mockOnFilterChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls onSearch when typing in search input', () => {
    render(
      <SearchBar
        onSearch={mockOnSearch}
        onFilterChange={mockOnFilterChange}
      />
    );

    const searchInput = screen.getByPlaceholderText(/search countries/i);
    fireEvent.change(searchInput, { target: { value: 'test' } });
    
    expect(mockOnSearch).toHaveBeenCalledWith('test');
  });

  it('calls onFilterChange when selecting region', () => {
    render(
      <SearchBar
        onSearch={mockOnSearch}
        onFilterChange={mockOnFilterChange}
      />
    );

    const regionSelect = screen.getByRole('combobox', { 
      name: /filter by region/i  // Made case insensitive
    });
    fireEvent.change(regionSelect, { target: { value: 'Europe' } });
    
    // Test to match exactly how onFilterChange is being called in the component
    expect(mockOnFilterChange).toHaveBeenCalledWith({ 
      sortBy: undefined, 
      sortOrder: undefined,
      region: 'Europe', 
      language: undefined
    });
  });
});