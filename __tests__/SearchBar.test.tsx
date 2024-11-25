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

    const searchInput = screen.getByRole('searchbox', {
      name: /search countries/i
    });
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

    const regionSelect = screen.getByDisplayValue('All regions');
    fireEvent.change(regionSelect, { target: { value: 'Europe' } });
    
    expect(mockOnFilterChange).toHaveBeenCalledWith({ region: 'Europe' });
  });
});